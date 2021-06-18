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
				"Nixers"			: "https://nixers.net/",
				"Instapaper"		: "https://instapaper.com/u",
				"Booky.io"			: "https://booky.io/"
			},
			"Nixdevil": {
				"Blog"				: "http://www.nixdevil.com/",
				"Wiki"				: "https://wiki.nixdevil.com",
				"MinIO"				: "https://minio.nixdevil.com",
				"Portainer (Nix)"	: "https://docker.nixdevil.com"
			},
			"Torafuma": {
				"Home Assistant"	: "https://hass.torafuma.com",
				"Reader"			: "https://reader.torafuma.com",
				"Nginx Proxy Manager"	: "https://proxy.torafuma.com/",
				"UNMS"				: "https://unms.torafuma.com",
				"Grafana"			: "https://grafana.torafuma.com",
				"Portainer (Home)"	: "https://docker.torafuma.com",
				"homesrv-bkup"		: "https://homesrv-bkup.torafuma.com",
				"websrv-bkup"		: "https://websrv-bkup.torafuma.com"
			},
			"Media": {
				"Youtube"			: "https://www.youtube.com/feed/subscriptions?app=desktop",
				"Plex"				: "https://app.plex.tv/desktop",
				"Media Portal"		: "https://media.torafuma.com",
				"Request"			: "https://request.torafuma.com",
				"Play Music"		: "https://play.google.com/music/listen?u=1",
				"Last.FM"			: "https://www.last.fm/user/torafuma"
			},
			"Productivity": {
				"GMail"				: "https://mail.google.com/mail/u/0/",
				"Outlook"			: "https://outlook.office365.com/owa",
				"Photos"			: "https://photos.google.com/u/0/",
				"Drive"				: "https://drive.google.com/drive/u/0/my-drive",
				"Keep"				: "https://keep.google.com/u/0/",
				"KEYBR.COM"			: "https://www.keybr.com/"
			},
			"Code": {
				"Github"			: "https://github.com/mikepruett3?tab=repositories",
				"Google Cloud"		: "https://console.cloud.google.com/storage/",
				"ifconfig"			: "https://ifconfig.co/"
			},
			"Shopping": {
				"Amazon"			: "https://amazon.com/",
				"EBay"				: "https://www.ebay.com/myb/Summary",
				"GIXEN"				: "https://www.gixen.com/",
				"GovDeals"			: "http://www.govdeals.com",
				"GSA Auctions"		: "https://gsaauctions.gov/gsaauctions/gsaauctions/"
			},
			"Gaming":{
				"EFT Weapon Modding"		: "https://www.eftdb.one/weaponmodding/220001/AK-74N/",
				"Diablo 3 Season Tracker"	: "https://d3resource.com/journey/index.php",
				"TypeRacer"			: "https://play.typeracer.com/",
				"TypeDrummer"		: "http://typedrummer.com/",
				"Krunker"			: "https://krunker.io",
				"Warframe"			: "steam://run/230410",
				"Warfame Farmlist"	: "https://wf.xuerian.net/e6cd7ed4-2bb1-460e-a82e-eac26bef50cc#wishlist",
				"Warfame Market"	: "https://warframe.market/"
			},
			"Jokes": {
				"8bitdash"			: "http://www.8bitdash.com",
				"WAN"				: "http://wanwan.moe",
				"Jurassic Systems"	: "http://www.jurassicsystems.com/about",
				"Sixteen Colors"	: "http://sixteencolors.net"
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