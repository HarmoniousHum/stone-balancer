// This script calls and implements the other scripts for stone's bio.
// All code copyright 2014-2015 GMSuerte.

// requirejs.config({
// 	config: {
// 		"moment": {
// 			noGlobal: true
// 		}
// 	},
// 	paths: {
// 		"jquery": [
// 			"https://code.jquery.com/jquery-2.1.3.min",
// 			"https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
// 			"https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.1.3.min",
// 			"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min"
// 		],
// 		"moment": [
// 			"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min",
// 			"http://momentjs.com/downloads/moment.min"
// 		],
// 		"moment-timezone": [
// 			"https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone.min"
// 		],
// 		"underscore": [
// 			"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
// 			"http://underscorejs.org/underscore-min"
// 		],
// 		"gms-ajax": "https://dl.dropboxusercontent.com/s/r4ph4vdfof1bkpf/gms-ajax",
// 		"gms-page": "https://dl.dropboxusercontent.com/s/d8wl74k6tgmp1cl/gms-page",
// 		"gms-user": "https://dl.dropboxusercontent.com/s/v1n6y1grc7879kp/gms-user",
// 		"gms-comment-form": "https://dl.dropboxusercontent.com/s/y5htsw2n7b3xxv7/gms-comment-form",
// 		"gms-storage": "https://dl.dropboxusercontent.com/s/5jowuu26nmm6elj/gms-storage",
// 		"gms-comments-loader": "https://dl.dropboxusercontent.com/s/empaxuwcqc0lj6l/gms-comments-loader",
// 		"gms-spoilers": "https://dl.dropboxusercontent.com/s/fzwsql6n3r50dg9/gms-spoilers",
// 		"gms-pictogram-loader": "https://dl.dropboxusercontent.com/s/cn3qosa0uml11yp/gms-pictogram-loader",
// 		"gms-box": "https://dl.dropboxusercontent.com/s/lpw8y9vtpmdvgst/gms-box",
// 		"gms-previewer": "https://dl.dropboxusercontent.com/s/s1w0n59ea7ex1kv/gms-previewer",
// 		"gms-validator": "https://dl.dropboxusercontent.com/s/5fmz9n34i491gpg/gms-validator",
// 		"gms-progress-meter": "https://dl.dropboxusercontent.com/s/4hw65x5okol446b/gms-progress-meter",
// 		"gms-utility": "https://dl.dropboxusercontent.com/s/65rgb6f25nqp3lt/gms-utility",
// 		"xbbcode": "https://dl.dropboxusercontent.com/s/yo7npv3q9hak4o8/xbbcode",
// 		"gms-miscellaneous": "https://dl.dropboxusercontent.com/s/38rpei6gqdfpfg9/gms-miscellaneous",
// 		"gms-time": "https://dl.dropboxusercontent.com/s/6hyocs6aibiei1w/gms-time",
// 		"gms-last-modified": "https://dl.dropboxusercontent.com/s/8zd1zd3uvfalv0h/gms-last-modified",
// 		"gms-slider": "https://dl.dropboxusercontent.com/s/w22wqv3vvn8xtud/gms-slider",
// 		"gms-unclumper": "https://dl.dropboxusercontent.com/s/2vrmzem9k44zw9x/gms-unclumper",
// 		"gms-map": "https://dl.dropboxusercontent.com/s/64must2oea42ogh/gms-map-4", // "https://dl.dropboxusercontent.com/s/7zvsuz6jbb5k88x/gms-map-3", // "https://dl.dropboxusercontent.com/s/rhn9jtdtav6yx6y/gms-map-2", // "https://dl.dropboxusercontent.com/s/xws15c8qbjp2x2p/gms-map",
// 		"gms-online-player": "https://dl.dropboxusercontent.com/s/7y5rzwruiryaqzu/gms-online-player",
// 		"gms-player-status-updater": "https://dl.dropboxusercontent.com/s/em0s1uvpq0s8dpd/gms-player-status-updater",
// 		"gms-pictogram": "https://dl.dropboxusercontent.com/s/iioxogmhr4q8khh/gms-pictogram"
// 	}
// });
requirejs(["https://dl.dropboxusercontent.com/s/z1ymfg9xgmn5aj9/require-config.js"], function() {
	requirejs(["backbone", "jquery", "gms-utility", "gms-user"], function(Backbone, $, util, user) {
		"use strict";

		$.ajaxSetup({
			cache: true
		});

		var $doc = $(document);
		var $win = $(window);
	
		requirejs(["gms-player-collection", "gms-player-model", "gms-pictogram-view", "gms-utility", "jquery", "moment", "gms-ajax"], function(PlayerCollection, PlayerModel, PictogramView, util, $, moment, ajax) {
			// var ForestStatusModel = Backbone.Model.extend({
			//
			// });
			
			var $updateWrapper = $("<div class='forest-status-wrapper'></div>")
			var $update = $("<div class='forest-status'></div>")
			$updateWrapper.append($update)
			
			function update() {
				$.ajax("/machine/playerstatus.php?action=get").done(function(str) {
					var $doc = $(str)
					
					var stone = $doc.filter("player[pictogram='3Abs1']")[0]
					
					if (stone) {
						var playerstate = stone.getAttribute("playerstate")
						
						var statusDescriptions = {
							0: "sleeping in the Forest",
							1: "sitting in the Forest",
							2: "standing in the Forest",
							3: "standing in the Forest",
							4: "walking through the Forest",
							5: "trotting through the Forest",
							6: "galloping through the Forest",
							7: "walking through the Forest",
							9: "listening for sounds in the Forest",
							10: "jumping in the Forest",
							13: "dancing&mdash;like the DJ he is&mdash;in the Forest"
						}
						
						var description = statusDescriptions[playerstate] || "in the forest"
					} else {
						var description = "not in the forest"
					}
					
					var text = "The stone balancer is " + description + "."
					
					$update.text(text)
					
					$("#stone-picture").after($updateWrapper);
				})
			}
			
			setInterval(update, moment.duration(60, "seconds").asMilliseconds())
			
			update()
		});
	
		requirejs(["gms-ajax"], function(ajax) {
			ajax.get("https://raw.githack.com/HarmoniousHum/stone-balancer/main/updates.html", {
				load: function(doc) {
					var status = document.importNode(doc.getElementById("status"), true);
					var updates = document.importNode(doc.getElementById("updates"), true);
				
					var $updates = $(updates);
				
					$updates.find("> section > header").eq(0).prepend(status);
					$updates.hide();
				
					var $updateLabels = $("#update-labels");
					$updateLabels.after(updates);
				
					$doc.ready(function() {
						util.load("https://dl.dropboxusercontent.com/s/pfdnwmgn1zig9g8/gms-unclump.js", function() {
							$updates.show();
							$updateLabels.removeAttr("style");
						});
					
						requirejs(["gms-miscellaneous"], function(misc) {
							misc.correctNoFlash();
							misc.goToParam();
							misc.showDateRanges();
						});
					});
				}
			}, this);
		});
	
		requirejs(["gms-progress-meter"], function(ProgressMeter) {
			ProgressMeter.settings.imgSrc = "https://f2.toyhou.se/file/f2-toyhou-se/images/69602352_Dzo98FSWOE2TELw.png";
			requirejs(["gms-utility", "gms-comment-form", "gms-spoilers", "gms-previewer"],
			function(util, CommentForm, spoilers, Previewer) {
				CommentForm.settings.success = function() {
					util.repliesToAdds();
					spoilers.generate();
				};

				Previewer.settings.dateFormat = "dddd, MMMM D, YYYY - h:mma";
				//ProgressMeter.settings.imgSrc =
				//	"https://f2.toyhou.se/file/f2-toyhou-se/images/69602352_Dzo98FSWOE2TELw.png";

				$doc.ready(function() {
					CommentForm.changeRedirects();
					util.repliesToAdds();
					new CommentForm().summon();
				});
			});
		});

		requirejs(["gms-storage"], function(storage) {
			var popUpCookie = storage.getStorageItem({
				name: "clickwrap",
				type: "node",
				persistence: "local"
			});
		
			$doc.ready(function() {
				var $container = $("#clickwrap-container");
				if (!popUpCookie.isSet) {
					$container.show();
				}
				$("#clickwrap-agree").on("click", function() {
					$container.hide();
					popUpCookie.set(null); // Actual value does not matter.
				});
				$("#clickwrap-disagree").on("click", function() {
					window.location.assign("/community/frontpage");
				});
			});
		});

		require(["gms-comments-loader", "gms-utility", "gms-spoilers", "gms-time", "gms-progress-meter"],
		function(commentsLoader, util, spoilers, time, ProgressMeter) {
			//ProgressMeter.settings.imgSrc =
			//	"https://f2.toyhou.se/file/f2-toyhou-se/images/69602352_Dzo98FSWOE2TELw.png";
			commentsLoader.settings.success = function() {
				util.repliesToAdds();
				spoilers.generate();
				time.replaceAllWithCorrect(true);
			};
			$doc.ready(function() {
				commentsLoader.init();
			});
		});

		require(["gms-spoilers"], function(spoilers) {
			$win.on("load", function() {
				spoilers.minWidth = spoilers.minHeight = 25;
				spoilers.generate();
			});
		});

		require(["gms-time"], function(time) {
			$doc.ready(function() {
				time.replaceAllWithCorrect(true);
				time.autoUpdater.start();
			});
		});

		document.body.addEventListener("touchstart", function(e) {
			if (e.target.classList.contains("tooltip-marker")) {
				$(e.target).find("+ .tooltip").toggle();
				if (e.target.tagName.toLowerCase() === "a") {
					e.preventDefault();
				}
			}
		}, false);

		$doc.ready(function() {
			$(".tooltip-marker").removeAttr("onclick");
		});

		var newDoctype = document.implementation.createDocumentType('html', '', '');
		document.doctype.parentNode.replaceChild(newDoctype, document.doctype);
	});
});
