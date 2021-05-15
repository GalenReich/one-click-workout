import sys
import time

import pychromecast
import pychromecast.controllers.dashcast as dashcast

# Chromecast friendly name
CAST_NAME = "The TV"
URL="http://192.168.1.6:3000"

chromecasts, browser = pychromecast.get_listed_chromecasts(
    friendly_names=[CAST_NAME]
)
if not chromecasts:
    print('No chromecast with name "{}" discovered'.format(CAST_NAME))
    sys.exit(1)

cast = chromecasts[0]
# Start socket client's worker thread and wait for initial status update
cast.wait()

d = dashcast.DashCastController()
cast.register_handler(d)

if not cast.is_idle:
    print("Killing current running app")
    cast.quit_app()
    t = 5
    while cast.status.app_id is not None and t > 0:
        time.sleep(0.1)
        t = t - 0.1


d.load_url(URL)
#browser.stop_discovery()

time.sleep(2)

d.load_url(
    "http://192.168.1.6:3000/? ",
    callback_function=lambda result: d.load_url(URL),
)