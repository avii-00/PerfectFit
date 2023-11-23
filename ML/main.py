import platform
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware #Handle cross origin resource sharing
from joblib import load
from pydantic import BaseModel  #Used for data validation and parsing
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity  
from PIL import Image, ImageOps, ImageDraw  
import os

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://genesis-frontend-dev.vercel.app",
    "https://genesis-frontend-sigma.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load the JSON data from the file
def load_json(json_file):
    with open(json_file) as f:
        return json.load(f)

# Prepare data for recommendation
def prepare_data(json_data, image_folder):
    attributes = []
    images = []

    for item_info in json_data:
        # Convert non-string attributes to strings before joining
        attributes.append(" ".join(str(item_info[attr]) for attr in item_info if attr not in ["images", "skin tone"]))
        image_paths = {item: os.path.join(image_folder, item.lower(), item_info["images"][item]) for item in item_info["images"]}
        images.append(image_paths)

    return attributes, images

# Get outfit recommendations based on user preferences
def get_outfit_recommendations(json_data, user_preferences, num_recommendations=5):
    # Prepare the data for recommendation
    attributes, images = prepare_data(json_data, "./outfit_images")

    # Create a vectorizer and transform the attributes into a feature matrix
    vectorizer = CountVectorizer()
    feature_matrix = vectorizer.fit_transform(attributes)

    # Convert the user preferences into a feature vector
    user_preferences_text = " ".join(user_preferences[attr] for attr in user_preferences)
    user_preferences_vector = vectorizer.transform([user_preferences_text])

    # Compute the similarity between the user preferences and the feature matrix
    similarity_scores = cosine_similarity(user_preferences_vector, feature_matrix)

    # Get the indices of the top recommendations based on similarity scores
    top_indices = similarity_scores.argsort()[0][-num_recommendations:][::-1]

    # Get the outfit images corresponding to the top recommendations
    outfit_recommendations = [images[index] for index in top_indices]

    return outfit_recommendations

# Function to create a collage from a list of image paths
def create_collage(image_paths, width, height, output_path):
    collage = Image.new("RGB", (width, height))
    max_size = min(width, height) // 2

    for i, image_path in enumerate(image_paths):
        img = Image.open(image_path)
        img = ImageOps.fit(img, (max_size, max_size), Image.ANTIALIAS)
        x = (i % 2) * max_size
        y = (i // 2) * max_size
        collage.paste(img, (x, y))

    draw = ImageDraw.Draw(collage)
    draw.text((10, height - 40), "Outfit Recommendation", fill="white")
    collage.save(output_path)

def generate_recommendation(data):
    # Provide the path to the JSON data file
    json_file_path = "processed.json"

    # Load the JSON data
    json_data = load_json(json_file_path)
    user_preferences = {
        "bust size": data.bust,
        "weight": data.weight,
        "body type": data.type,
        "category": data.occasion,
        "height": data.height,
        "size": data.size,
        "age": data.age,
        "skin tone": data.skin
    }
    # Get outfit recommendations based on user preferences
    recommendations = get_outfit_recommendations(json_data, user_preferences)

    # Display the outfit recommendations with collages
    if recommendations:
        print("Here are some outfit recommendations for you:")
        for i, outfit in enumerate(recommendations):
            print(f"\nOutfit {i + 1}:")
            for item, image_path in outfit.items():
                print(f"{item}: {image_path}")
            collage_width = 600
            collage_height = 400
            collage_output_path = f"outfit_{i + 1}.jpg"
            create_collage(list(outfit.values()), collage_width, collage_height, collage_output_path)
    else:
        print("Sorry, no outfit recommendations found for your preferences.")

# schema for the request body
class Query(BaseModel):
    uid: str
    name: str
    age: str
    height: str
    weight: str
    bust: str
    size: str
    skin: str
    occasion: str
    type: str

# controller function that takes in a http request with query as the body and sends appropiate response
@app.post("/query")
async def createQuery(query: Query):
    try:
        generate_recommendation(query)
        return {"status": "success", "data": {}}
    except:
        return {"status": "fail", "data": None}
