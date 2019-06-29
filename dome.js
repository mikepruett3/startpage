/*
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018 Jaume Fuster i Claris
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// "Thus, programs must be written for people to read, and only incidentally for machines to execute."
// TODO: Commenting.


// ---------- CONFIGURATION ----------

// div.innerHTML : {a.innerHTML : a.href}
var sites = {
			"Social": {
				"Reddit"			: "https://www.reddit.com",
				"Telegram"			: "https://web.telegram.org",
				"Twitch"			: "https://www.twitch.tv/directory/following/",
				"Instapaper"		: "https://instapaper.com/u",
				"4/vr/"				: "https://boards.4chan.org/vr/"
			},
			"Servers": {
				"Home Assistant"	: "https://hass.torafuma.com",
				"DVR"				: "https://dvr.torafuma.com",
				"TasmoAdmin"		: "https://tasmoadmin.torafuma.com",
				"Media Portal"		: "https://media.torafuma.com",
				"Request"			: "https://request.torafuma.com",
				"UNMS"				: "https://unms.torafuma.com",
				"PiHole"			: "https://pihole.torafuma.com",
				"Grafana"			: "https://grafana.torafuma.com",
			},
			"Media": {
				"Youtube"			: "https://www.youtube.com/feed/subscriptions?app=desktop",
				"Plex"				: "https://app.plex.tv/desktop",
				"Play Music"		: "https://play.google.com/music/listen?u=1",
				"Last.FM"			: "https://www.last.fm/user/torafuma"
			},
			"Productivity": {
				"GMail"				: "https://mail.google.com/mail/u/1/",
				"Inbox"				: "https://inbox.google.com/u/1/?pli=1",
				"Outlook"			: "https://outlook.office365.com/owa",
				"Photos"			: "https://photos.google.com/u/1/",
				"Drive"				: "https://drive.google.com/drive/u/1/my-drive",
				"Keep"				: "https://keep.google.com/u/1/"
			},
			"Code": {
				"Github"			: "https://github.com/mikepruett3?tab=repositories",
				"Google Cloud"		: "https://console.cloud.google.com/storage/",
				"ifconfig"			: "https://ifconfig.co/"
			},
			"Other": {
				"Amazon"			: "https://amazon.com/",
				"EBay"				: "https://www.ebay.com/myb/Summary",
				"GIXEN"				: "https://www.gixen.com/",
				"KEYBR.COM"			: "https://www.keybr.com/"
			},
			"Games": { // To find the game ID check the url in the store page or the community page
				"TypeRacer"			: "https://play.typeracer.com/",
				"7 Days to Die"		: "steam://run/251570",
				"Warframe"			: "steam://run/230410",
				"Warfame Farmlist"	: "https://wf.xuerian.net/e6cd7ed4-2bb1-460e-a82e-eac26bef50cc#wishlist",
				"Ark"				: "steam://run/346110",
				"Terraria"			: "steam://run/105600"
			}
		};

var search = "https://duckduckgo.com/";		// The search engine
var query  = "q";						// The query variable name for the search engine

var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";
	
// ---------- BUILD PAGE ----------
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	match = new RegExp(regex ? regex : ".", "i");
	gmatches = false; // kinda ugly, rethink
	for (i = 0; i < Object.keys(sites).length; i++) {
		matches = false;
		sn = Object.keys(sites)[i];
		section = document.createElement("div");
		section.id = sn;
		section.innerHTML = sn;
		section.className = "section";
		inner = document.createElement("div");
		for (l = 0; l < Object.keys(sites[sn]).length; l++) {
			ln = Object.keys(sites[sn])[l];
			if (match.test(ln)) {
				link = document.createElement("a");
				link.href = sites[sn][ln];
				//link.target = '_blank';
				link.innerHTML = ln;
				if (!pivotbuffer++ && regex != "") {
					link.className = "selected";
					document.getElementById("action").action = sites[sn][ln];
					document.getElementById("action").children[0].removeAttribute("name");
				}
				inner.appendChild(link);
				matches = true;
				gmatches = true;
				totallinks++;
			}
		}
		section.appendChild(inner);
		matches ? p.appendChild(section) : false;
	}
	if (!gmatches || regex == "") {
		document.getElementById("action").action = search;
		document.getElementById("action").children[0].name = query;
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight+"px";
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 38:
			pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
			matchLinks();
			break;
		case 40:
			pivotmatch = pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
			matchLinks();
			break;
		default:
			break;
	}
	document.getElementById("action").children[0].autofocus();
}

document.getElementById("action").children[0].onkeypress = function(e) {
	if (e.key == "ArrowDown" || e.key == "ArrowUp") {
		return false;
	}
}

function displayClock() {
	var time = new Date();
	clock = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
	date = time.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit',  year: '2-digit'});
	document.getElementById("clock").innerHTML = date + ", " + clock;
}

function getExternalIP() {
	$.getJSON('https://ipinfo.io', function(data) {
		var extIP = data.ip;
		document.getElementById("information").innerText = extIP;
	})
}

window.onload = matchLinks();

displayClock();

setInterval(displayClock, 1000);

getExternalIP();