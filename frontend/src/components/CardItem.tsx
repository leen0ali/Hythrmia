import React from 'react';

interface CardItemProps {
  imageSrc: string;
  title: string;
  text: string;
  buttonText?: string;
  buttonLink?: string; // ✅ optional
  onClick?: () => void; // ✅ added for action button
}

const CardItem: React.FC<CardItemProps> = ({
  imageSrc,
  title,
  text,
  buttonText,
  buttonLink,
  onClick,
}) => {
  return (
    <>
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid #0ff;
          background: rgba(0, 0, 20, 0.85);
          border-radius: 12px;
          color: #0ff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px #0ff;
        }

        .card-img-top {
          width: 100%;
          height: 220px;
          object-fit: contain;
        }

        .card-title {
          font-size: 2.2rem;
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }

        .card-text {
          font-size: 1.6rem;
          font-family: 'Courier New', monospace;
        }

        .btn-cyberpunk {
          background-color: #12082a;
          border: 2px solid #2b0e5e;
          color: #00ffff;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          font-size: 1.3rem;
          width: 100%;
          padding: 0.9rem 0;
          height: 60px;
          border-radius: 6px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-cyberpunk:hover {
          background-color: #2b0e5e;
          color: #ffffff;
          box-shadow: 0 0 12px #6720ff;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
      `}</style>

      <div className="col-md-6 col-lg-3">
        <div className="card card-hover h-100">
          <img src={imageSrc} alt={title} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            {buttonText && (
              buttonLink ? (
                <a href={buttonLink} className="btn btn-cyberpunk mt-3">
                  {buttonText}
                </a>
              ) : (
                <button className="btn btn-cyberpunk mt-3" onClick={onClick}>
                  {buttonText}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
