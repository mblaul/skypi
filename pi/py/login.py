import requests

url = "http://18.235.27.33/api/user/login"

payload = "email=mblaul%40oakland.edu&password=123123123"
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
