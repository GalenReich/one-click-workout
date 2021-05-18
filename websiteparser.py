from bs4 import BeautifulSoup
import requests
import json
import numpy as np

base = "https://www.chloeting.com"
url = base + '/program/2021/summer-shred-challenge.html' 
page = requests.get(url).text
soup = BeautifulSoup(page, "html.parser")

splitstr = "https://youtu.be/"
data = []

for div in soup.findAll('div', attrs={"class" : "cal-entry"}):
    dayString = div.find('div', attrs={"class" : "info"}).find('p').text.strip()
    videos = div.find('div', attrs={"class": "videos"})
    vids = []
    thumbs = []
    for a in videos.findAll('a',href=True):
        link = a['href'].strip()
        youtube_id = link.split(splitstr)[1]
        vids.append(youtube_id)
        
        thumb = a.find("img")['src']
        thumbs.append(base+thumb)

    watched = [False] * len(vids)
    data.append({"name" : dayString, "videos" : {"id" : vids, "thumbnails" : thumbs, "watched" : watched}, "watched" : False})

with open('./playlist-tracker/src/data.json', 'w') as f:
    json.dump(data, f)