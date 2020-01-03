---
layout: post
title: Extract SPOT location emails from gmail and upload to Google maps as waypoints
featured-img: "/assets/images/colorado_trail_banner.jpg"
---

Along with a buddy, I recently completed the [Colorado Trail](https://en.wikipedia.org/wiki/Colorado_Trail). Ideally, we would have used a phone or GPS to save a list of waypoints, but we didn't think of this beforehand. We did have a SPOT GPS beacon that could trigger an email containing the beacon's current location to be sent; we'd send an "Okay" signal upon reaching camp each night. This post outlines a procedure to extract the location emails from gmail, then upload them as waypoints into a Google map.  This assumes you know how to run a Bash script.

There are four steps. Filter and then label the location emails. Export the labelled emails as a zip archive. Extract latitude, longitude and timestamp from the exported email archive and save in a csv. Load the csv of waypoints into Google maps.



### Add gmail label to identify location emails
* Make a gmail filter that returns only the wanted location alerts, something like `from:noreply@findmespot.com after:2018/06/30 before:2018/08/03 latitude`
* Select all
* Add a new label, e.g. "CT_spot_checkins"
	* Labels > Create New > enter text "CT_spot_checkins" > Create


### Export labelled emails
Google provides a way to download many kinds of data for an account through an archiving page, including gmail emails.

* Go to Google archiving page: https://takeout.google.com/settings/takeout
* Click 'Select None'
* Find 'Mail', toggle it on and open tab
* Click 'Select Labels'
* Double-click 'Toggle all' to deselect all
* Toggle on CT_spot_checkins (may need to wait a bit and reload for new labels to appear)
* Hit 'OK' > scroll down and hit 'Next' > leave defaults and hit 'Create archive'
* 'Manage Archive' > 'Download' (you'll probably have to provide login credentials to download)


### Extract location data into a csv
* The extracted emails are in a format called MBOX. It's a text format that should probably be dealt with using a proper parser, but I'm just gonna slice it up with Bash
* Extract the exported zip archive
* Run the following from the directory containing the extracted 'Takeout' folder:

```shell
cd Takeout/Mail
mbox_file="CT_spot_checkins.mbox"
cat $mbox_file |
# filter to interesting lines
grep 'From \|X-SPOT-Latitude\|X-SPOT-Longitude\|X-SPOT-Time' |
# remove DOS carriage returns
sed -e "s/\\r$//g" |
# join 4 lines at a time, replacing newlines with a space
sed 'N;N;N;s/\n/ /g' |
# extract lat, long, and formatted date
awk '{$14=strftime("%Y-%m-%dT%H:%M:%SZ", $14); print $10","$12","$14 }' |
# prepend column headers and dump into file
sed '1s/^/latitude,longitude,date\n/' > lat_long_date.csv
```

### Load csv waypoints into Google map
* Open Google maps
* Main menu > 'Your places' > 'Maps' > 'Create Map'
* Under "Untitled layer", click 'Import'
* Find and select lat_long_date.csv
* Select 'latitude' and 'longitude' in the 'Choose columns to position your placemarks' dialog
* Choose 'date' in the 'Choose a column to title you markers' dialog

And that's all it takes. Here's the final result:
<iframe class="map-frame" src="https://www.google.com/maps/d/embed?mid=1Dlkx_7Z12fOlTA5yQ_7R7YFLg1_oBSlt" width="640" height="480"></iframe>






