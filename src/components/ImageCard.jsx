import { Fragment } from "react";

function ImageCard({
  image,
  onPreview,
  onLike,
  onDelete,
}) {
  return (
    <>
      <article className="image-card">

        <div
          className="image-container"
          onClick={() => onPreview(image)}
        >
          <img
            src={image.url}
            alt={image.title}
            className="image"
          />

          <div className="view-overlay">
            <span>View Image</span>
          </div>
        </div>

        <div className="card-content">

          <div className="card-top">
            <span className="category">
              {image.category}
            </span>

            <button
              className={`like-button ${
                image.liked ? "liked" : ""
              }`}
              onClick={() => onLike(image.id)}
            >
              {image.liked ? "♥" : "♡"}
            </button>
          </div>

          <h2>{image.title}</h2>

          <p>{image.description}</p>

          <button
            className="delete-button"
            onClick={() => onDelete(image.id)}
          >
            🗑 Delete
          </button>

        </div>

      </article>
    </>
  );
}

export default ImageCard;