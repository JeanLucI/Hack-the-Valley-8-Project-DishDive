#Dish Dive Website

#Required: List of food preferences, List of Filters, List of Allergies

#pip install openai

# Necessary modules
import openai                               # pip install openai
openai.api_key = "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"

from PIL import Image   # pip install pillow
import requests         # pip install requests
from io import BytesIO


# This Data is given from databse or somethin idk
preferences = ["Chicken", "Pasta", "Spinach", "Pizza", "Burgers", "Tacos"]
filters  = ["Eco-friendly", "Meat", "Quick to Prepare"]
allergies = ["Nuts", "StrawBerries"]


#Creating the Prompt
pref = ""
filt = ""
aller = ""

for food in preferences:
    pref += food + ", "

for item in filters:
    filt += item + ", "
    
for food in allergies:
    aller += food + ", "
    
text_prompt = "Imagine you are hungry and need food ideas, give a list of 10 food ideas based on the preferences:" + pref + "with filters: "+ filt + "in the format Meal: Ingredient1, ingredient2 ... where each meal is seperated with a newline and each ingredient is seperated with a comma"
    
    
#print(pref + filt + aller)
#print(text_prompt)


#ChatGPT Response

chatgpt_response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": text_prompt}],
    temperature=0.9,
    max_tokens=2000,
    top_p=0.95)

#Get the list of foods
response = chatgpt_response['choices'][0]['message']['content'].strip()
print(response)