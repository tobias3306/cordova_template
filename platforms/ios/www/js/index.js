/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //this.receivedEvent('deviceready');

        showMap();


    },

    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};

app.initialize();

class ATM {

    constructor(Adresse, Adress, Agen, Quoi, Wat, What, Lat, Long) {
        this.Adresse = Adresse;
        this.Adress = Adress;
        this.Agen = Agen;
        this.Quoi = Quoi;
        this.Wat = Wat;
        this.What = What;
        this.Lat = Lat;
        this.Long = Long;
    }
}

function showMap() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
    function onSuccess(position) {
        //console.log(position);
        //var lat=position.coords.latitude;
        //var long=position.coords.longitude;

        var div = document.getElementById("map");

        map = plugin.google.maps.Map.getMap(div);

        map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

        function onMapReady() {

            fetchATM(function (result) {
                var ATMlist = result;
                for (var i = 0; i < ATMlist.length; i++) {
                    var pos = {"lat": ATMlist[i].Lat, "lng": ATMlist[i].Long};
                    map.addMarker({
                        'position': pos,
                        'title': i
                    });
                }
            });            
        }

    }
    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

function fetchATM(callback) {
    var url = "http://192.168.0.100/atmwebservice.php";

    $.ajax({
        url: url,
        success: handleResult
    });

    function handleResult(result) {
        var obj = JSON.parse(result);
        ATMlist = [];
        for (i in obj) {
            var atm = new ATM(obj[i].Adresse, obj[i].Adress, obj[i].Agen, obj[i].Quoi, obj[i].Wat, obj[i].What, obj[i].Coord[0], obj[i].Coord[1]);
            //console.log(atm);
            ATMlist.push(atm);
        }
        callback(ATMlist);
    }
    
}

function checkDB(){

    

}