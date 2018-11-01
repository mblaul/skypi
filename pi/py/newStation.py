import os
import socket
import requests
import json
import subprocess
from uuid import getnode as get_mac


#Functions--------------------------------

def login(user,password):
    url = "http://18.235.27.33/api/user/login"
    user = user.replace('@','%40')

    payload = "email="+user+"&password="+password
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    response = requests.request("POST", url, data=payload, headers=headers)

    token = response.json()['token']
    #print('Your temporary token is: ' + token)
    return token
def register(token):
    mac = str(get_mac())
    host = socket.gethostname()

    url = "http://18.235.27.33/api/device/register"

    payload = "name=" + host + "&macaddress="+ mac + "&model=SkyPi5000&ipaddress=127.0.0.1&ispublic=true"
    headers = {
                        'Authorization': token,
                                        'Content-Type': "application/x-www-form-urlencoded"
                                                            }

    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)
    regReturn = response.json()
    print(regReturn)
    id = regReturn['_id']
    file = open('id.key', 'w')
    file.write(id)
    file.close
    

#Begin---------------------------------------

print('Welcome to the Skypi Weather Station Set Up Tool!\n')
print('We will first enable your sensor and validate the connections')
print('_____________________________________________________________')
print('Enabling BME280 Sensor...\n')
os.system('raspi-config nonint do_i2c 0')
dev = os.system('ls /dev/*i2c*')
if dev != 0:
	print('Your Sensor was not found. Please ensure all conections are correct, and that you have the correct model')
	exit()

else: 
	print('done!\n')
print('Ensuring the device is properly connected to the board...')

board = subprocess.check_output('i2cdetect -y 1',shell=True)
print(board)
if '77' not in board:
    print('Error: Sensor not configured correctly. Please check the connection of your sensor  matches the config in the BME_280 sensor docs provided.')
else:
    print('done!')

print('Sensor set up complete. We will now set up your device so you can begin push weather data to SkyPi HQ')
print('_____________________________________________________________________________________________________')

user = raw_input('Enter the Email address you use to login to SkyPi Weather Services:\n')
pw = raw_input('Enter the corresponding password:\n')

token = login(user,pw)
register(token)
