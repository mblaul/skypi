import requests
import socket
from uuid import getnode as get_mac
mac = str(get_mac())

url = "http://18.235.27.33/api/device/register"

payload = "name=" + host + "&macaddress="+ mac + "&model=Flyboi5000&ipaddress=192.168.1.100"
headers = {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWIxMGEzNTk2OTc5MTEzMWE4MmI0NSIsIm5hbWUiOiJNYXJ0eSBNY0ZseSIsImlhdCI6MTUzNzIxODcxMywiZXhwIjoxNTM3MjIyMzEzfQ.wv70LlKmtdAU8A94NoC-mlDbhGhaMO3QYqBC0AhpveI",
                'Content-Type': "application/x-www-form-urlencoded"
                    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
