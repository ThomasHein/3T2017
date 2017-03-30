import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import logo from './logo.svg'

class App extends Component {
	mylist=[];
render() {
    return (
      <div className="App">
         <div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
          <h2>Willkommen auf unserem Reiseportal</h2>
		  <h3>Hier bleiben keine Wünsche offen</h3>
         </div>
		 <div id="MiddleDiv">
			<label>Region:
		 <select>
			 <option value="Berlin">Berlin</option>
			 <option value="Brandenburg">Brandenburg</option>
		 </select>
		 </label>
		 <button type="button" onClick={()=> this.search()} >Reise suchen</button>
		 <button type="button" onClick={() => this.book()} >Jetzt buchen</button>
		 </div>
		 <div id="ReisenDiv"></div>
      </div>
     );
   };
   search(){
     console.log("start search");
	 $.get("http://localhost:4000/Reisen", function(data){
			$("#ReisenDiv").append("<h3>loading....</h3>");
	 }).done(function(data){
		 this.mylist=[];
			console.log("Datalength: "+data.length);
			for(var i=0;i<data.length;i++){
				// this.mylist.push("Reise nach: "+data[i].Ort);
				this.mylist.push(data[i]);
				console.log(this.mylist[i]);
			};
			$("#ReisenDiv").empty();
			// for(var j=0;j<this.mylist.length;j++){
				// $("#ReisenDiv").append("<p>"+this.mylist[j]+"</p>")
			// }
			
			$("#ReisenDiv").append("<table id='table'><tr><th>Id</th><th>Ort</th><th></th></tr>")
			for(var j=0;j<this.mylist.length;j++){
				console.log(this.mylist[j].id);
				$("#ReisenDiv").append("<tr><td>"+this.mylist[j].id+"</td><td>"+this.mylist[j].Ort+"</td><td></td>");
			}
			$("#ReisenDiv").append("</table>")
			console.log("end search");
	 }).fail(function(){
		console.log("Error while searching"); 
	 });
   }
   book(){
	   console.log("start booking");
	   $.post("http://localhost:4000/Buchungen",{
        "Kundenummer": 0,
        "Ort": "Oceola",
		"Kundenname":"Testkunde"
      }).done(function(){
		  console.log("end booking");
		  $("#MiddleDiv").empty();
		  $("#ReisenDiv").empty();
		  $("#MiddleDiv").append("<h1>Vielen Dank für Ihre Buchung!</h1>");
	  }).fail(function(){
		  console.log("Error while booking");
		  $("#MiddleDiv").empty();
		  $("#ReisenDiv").empty();
		  $("#MiddleDiv").append("<h1>Vielen Dank für Ihre Buchung!</h1>");
	  });
   }
}
export default App;

