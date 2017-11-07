//requires
const express = require( 'express' )
const app = express()
const path = require( 'path' )
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )
const PORT = process.env.PORT || 3333 

//uses
app.use( bodyParser.json() )
app.use( express.static( 'public' ) )
app.use(bodyParser.urlencoded({extended:true}))

// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' )

//schema
const ourSchema = mongoose.Schema({
  name: String,
  location: String
})

//model
const ourModel = mongoose.model( 'ourmodels', ourSchema )

//base url hit
app.get( '/', ( req, res ) => {
  res.sendFile( path.resolve( 'public/index.html' ) )
})

app.get( '/getRecords', ( req, res ) => {
  // get and send back all the things
  ourModel.find().then(data => {
    res.send( data )
  })
}) //end getRecords GET

app.post( '/testPost', ( req, res ) => {
  console.log( 'req.body.name: ' + req.body.name )
  // retrieved the req.body
  // putting it into an object to be saved in the db
  let recordToAdd = {
    name: req.body.name,
    location: req.body.location
  }
  // create new record
  let newRecord = ourModel( recordToAdd )
  newRecord.save()
}) //end testPost POST

app.delete('/deleteRecord/:id', (req,res) => {
  console.log('got this:',req.params.id)
  ourModel.remove({_id: req.params.id}, (err) => {
    if(err){
      console.log(err)
    }
    else{
      res.send(200)
    }
  })
})

app.listen( PORT, 'localhost', ( req, res ) => {
  console.log( `Listening on ${PORT}` )
})
