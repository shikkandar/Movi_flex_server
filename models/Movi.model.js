import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
    name: String,
    moviname:String,
    price:String,
    poster:String,
    description:String,
    runningMovies: Boolean
});

const Movies = mongoose.model('movies',theaterSchema,'movies');

export default Movies;