import { useState } from "react";
import ImageCard from "./ImageCard";

import beach from "../assets/beach.jpg";
import forest from "../assets/forest.jpg";
import lake from "../assets/lake.jpg";
import mountain from "../assets/mountain.jpg";
import waterfall from "../assets/waterfall.jpg";
import desert from "../assets/desert.jpg";
import city from "../assets/city.jpg";
import sunset from "../assets/sunset.jpg";

function Gallery() {
  const [images, setImages] = useState([
    {
      id: 1,
      url: mountain,
      title: "Mountain",
      description:
        "Beautiful mountain landscape surrounded by nature.",
      category: "Mountain",
      liked: false,
    },
    {
      id: 2,
      url: beach,
      title: "Beach",
      description: "Beautiful beach with blue water.",
      category: "Beach",
      liked: false,
    },
    {
      id: 3,
      url: forest,
      title: "Forest",
      description: "Green forest surrounded by nature.",
      category: "Forest",
      liked: false,
    },
    {
      id: 4,
      url: lake,
      title: "Lake",
      description:
        "Beautiful lake surrounded by mountains.",
      category: "Lake",
      liked: false,
    },
    {
  id: 5,
  url: waterfall,
  title: "Waterfall",
  description: "Beautiful waterfall surrounded by greenery.",
  category: "Waterfall",
  liked: false,
},
{
  id: 6,
  url: desert,
  title: "Desert",
  description: "Amazing desert landscape under the clear sky.",
  category: "Desert",
  liked: false,
},
{
  id: 7,
  url: city,
  title: "City",
  description: "Modern city view with beautiful buildings.",
  category: "City",
  liked: false,
},
{
  id: 8,
  url: sunset,
  title: "Sunset",
  description: "Beautiful sunset over the landscape.",
  category: "Sunset",
  liked: false,
},   
]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newImage, setNewImage] = useState({
    title: "",
    url: "",
    description: "",
    category: "Mountain",
  });

  /* Categories */

  const categories = [
    "All",
    ...new Set(images.map((image) => image.category)),
  ];

  /* Search + Filter */

  const filteredImages = images.filter((image) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      image.title.toLowerCase().includes(searchText) ||
      image.description.toLowerCase().includes(searchText) ||
      image.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || image.category === category;

    return matchesSearch && matchesCategory;
  });

  /* Like */

  function handleLike(id) {
    setImages((currentImages) =>
      currentImages.map((image) =>
        image.id === id
          ? { ...image, liked: !image.liked }
          : image
      )
    );

    setSelectedImage((currentImage) => {
      if (!currentImage || currentImage.id !== id) {
        return currentImage;
      }

      return {
        ...currentImage,
        liked: !currentImage.liked,
      };
    });
  }

  /* Delete */

  function handleDelete(id) {
    setImages((currentImages) =>
      currentImages.filter((image) => image.id !== id)
    );

    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  }

  /* Preview */

  function handlePreview(image) {
    setSelectedImage(image);
  }

  function closePreview() {
    setSelectedImage(null);
  }

  /* Next */

  function handleNext() {
    if (!selectedImage || filteredImages.length <= 1) {
      return;
    }

    const currentIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % filteredImages.length;

    setSelectedImage(filteredImages[nextIndex]);
  }

  /* Previous */

  function handlePrevious() {
    if (!selectedImage || filteredImages.length <= 1) {
      return;
    }

    const currentIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    const previousIndex =
      currentIndex === -1
        ? 0
        : (currentIndex - 1 + filteredImages.length) %
          filteredImages.length;

    setSelectedImage(filteredImages[previousIndex]);
  }

  /* Add Image Input */

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewImage((currentImage) => ({
      ...currentImage,
      [name]: value,
    }));
  }

  /* Add Image */

  function handleAddImage(event) {
    event.preventDefault();

    if (
      !newImage.title.trim() ||
      !newImage.url.trim() ||
      !newImage.description.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    const image = {
      id: Date.now(),
      url: newImage.url,
      title: newImage.title,
      description: newImage.description,
      category: newImage.category,
      liked: false,
    };

    setImages((currentImages) => [
      ...currentImages,
      image,
    ]);

    setNewImage({
      title: "",
      url: "",
      description: "",
      category: "Mountain",
    });

    setShowAddForm(false);
  }

  return (
    <div className="gallery-page">

      {/* Header */}

      <header className="gallery-header">
        <div>
          <p className="small-title">REACT PROJECT</p>

          <h1>Image Gallery</h1>

          <p className="subtitle">
            Explore, search and manage your favorite images.
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add Image
        </button>
      </header>

      {/* Search and Filter */}

      <section className="controls">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="filter-box">
          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </section>

      {/* Result Information */}

      <div className="result-info">
        <p>
          Showing{" "}
          <strong>{filteredImages.length}</strong>{" "}
          {filteredImages.length === 1
            ? "image"
            : "images"}
        </p>
      </div>

      {/* Gallery */}

      <main className="gallery">

        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onPreview={handlePreview}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              🔎
            </div>

            <h2>No images found</h2>

            <p>
              Try another search term or choose a
              different category.
            </p>
          </div>
        )}

      </main>

      {/* Add Image Modal */}

      {showAddForm && (
        <div
          className="modal-background"
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="add-form"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">
              <div>
                <p className="modal-small-title">
                  NEW IMAGE
                </p>

                <h2>Add New Image</h2>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddImage}>

              {/* Title */}

              <div className="form-group">
                <label>Image Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter image title"
                  value={newImage.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* URL */}

              <div className="form-group">
                <label>Image URL</label>

                <input
                  type="text"
                  name="url"
                  placeholder="Paste image URL"
                  value={newImage.url}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Enter image description"
                  value={newImage.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}

              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={newImage.category}
                  onChange={handleInputChange}
                >
                  <option value="Mountain">Mountain</option>
                  <option value="Beach">Beach</option>
                  <option value="Forest">Forest</option>
                  <option value="Lake">Lake</option>
                  <option value="Waterfall">Waterfall</option>
                  <option value="Desert">Desert</option>
                  <option value="City">City</option>
                  <option value="Sunset">Sunset</option>
                </select>
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Add Image
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Image Preview Modal */}

      {selectedImage && (
        <div
          className="modal-background preview-background"
          onClick={closePreview}
        >
          <div
            className="preview-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-button preview-close"
              onClick={closePreview}
            >
              ×
            </button>

            <div className="preview-image-container">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
              />
            </div>

            <div className="preview-content">

              <span className="category">
                {selectedImage.category}
              </span>

              <h2>{selectedImage.title}</h2>

              <p>
                {selectedImage.description}
              </p>

              <button
                className={`preview-like ${
                  selectedImage.liked
                    ? "liked"
                    : ""
                }`}
                onClick={() =>
                  handleLike(selectedImage.id)
                }
              >
                {selectedImage.liked
                  ? "♥ Liked"
                  : "♡ Like"}
              </button>

            </div>

            <div className="navigation-buttons">

              <button
                onClick={handlePrevious}
                disabled={
                  filteredImages.length <= 1
                }
              >
                ← Previous
              </button>

              <span>
                {filteredImages.findIndex(
                  (image) =>
                    image.id ===
                    selectedImage.id
                ) + 1}{" "}
                / {filteredImages.length}
              </span>

              <button
                onClick={handleNext}
                disabled={
                  filteredImages.length <= 1
                }
              >
                Next →
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Gallery;