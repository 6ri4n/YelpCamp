const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6440bbe075930449da6586e7",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita laboriosam in, provident doloremque distinctio ab quos veniam odio est doloribus, amet quam beatae eligendi aspernatur harum! Vel temporibus ratione aliquam.",
      price,
      geometry: { type: "Point", coordinates: [-122.330062, 47.603832] },
      images: [
        {
          url: "https://res.cloudinary.com/drg6ox89a/image/upload/v1682135561/YelpCamp/btijtdtl00yxt22ik2yb.jpg",
          filename: "YelpCamp/btijtdtl00yxt22ik2yb",
        },
        {
          url: "https://res.cloudinary.com/drg6ox89a/image/upload/v1682135561/YelpCamp/pmlzyjaohhxpde54l2jr.jpg",
          filename: "YelpCamp/pmlzyjaohhxpde54l2jr",
        },
        {
          url: "https://res.cloudinary.com/drg6ox89a/image/upload/v1682135561/YelpCamp/brtwrklixfj1fz7mmbtq.jpg",
          filename: "YelpCamp/brtwrklixfj1fz7mmbtq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
