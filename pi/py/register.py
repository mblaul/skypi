import requests
import socket
import json
from uuid import getnode as get_mac
url = "http://18.235.27.33/api/user/login" 
payload = "email=jfbauer%40oakland.edu&password=432234" 
headers = {'Content-Type': 'application/x-www-form-urlencoded'}  
response = requests.request("POST", url, data=payload, headers=headers)

data = response.json()
token = data['token']

mac = str(get_mac())
host = socket.gethostname()

url = "http://18.235.27.33/api/device/register"

payload = "name=" + host + "&macaddress="+ mac + "&model=Flyboi5000&ipaddress=192.168.1.100&ispublic=true"
headers = {
            'Authorization': token,
                'Content-Type': "application/x-www-form-urlencoded"
                    }

response = requests.request("POST", url, data=payload, headers=headers)
regReturn = response.json()
print(regReturn)
id = regReturn['_id']
file = open('id.key', 'w')
file.write(id)
file.close
print(response.text)

