import requests

url = "http://18.235.27.33/api/user/login"

payload = "email=jfbauer%40oakland.edu&password=432234"
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
