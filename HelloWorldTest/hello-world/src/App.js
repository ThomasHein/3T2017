import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import logo from './logo.svg'

class App extends Component {
	constructor(){
		super();
		this.state={
			mylist:[]
		};
	}
	render() {
		return (
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Willkommen auf unserem Reiseportal</h2>
				<h3>Hier bleiben keine Wünsche offen</h3>
			</div>
			<div id="MiddleDiv">
				<button type="button" onClick={()=> this.search()} >Reise suchen</button>
				<button type="button" onClick={() => this.book()} >Jetzt buchen</button>
			</div>
			<div id="ReisenDiv"></div>
		</div>
     );
   };
   search(){
	    var that=this;
		console.log("start search");
		$.get("http://localhost:4000/Reisen", function(data){
				$("#ReisenDiv").append("<h3>loading....</h3>");
		}).done(function(data){
			console.log("Datalength: "+data.length);
			console.log(that.state.mylist.length);
			for(var i=0;i<data.length;i++){
				that.state.mylist.push(data[i]);
				console.log(that.state.mylist[i]);
			};
			$("#ReisenDiv").empty();
			$("#ReisenDiv").append("<table id='table'><thead><tr><th>Id</th><th>Ort</th><th></th></tr></thead> <tbody id='body'>")
			for(var j=0;j<that.state.mylist.length;j++){
				console.log(that.state.mylist[j].id);
				$("#body").append("<tr><td>"+that.state.mylist[j].id+
				"</td><td>"+that.state.mylist[j].Ort+
				"</td><td><input type='radio' name='travel' value="+j+" /></td>");
			}
			$("#ReisenDiv").append(" </tbody></table>")
			console.log("end search");
		}).fail(function(){
			console.log("Error while searching"); 
		});
	}
   book(){
	   var that=this;
	   console.log("start booking");
	   var index=$('input[name=travel]:checked').val();
	   console.log("Index: "+index);
	   var data=that.state.mylist[index];
	   console.log(data.Ort);
	   $.post("http://localhost:4000/Buchungen",{ "Buchungen":{
			"Kundenummer": 0,
			"Ort": data.Ort,
			"Kundenname":"Testkunde"
	   }}).done(function(){
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

