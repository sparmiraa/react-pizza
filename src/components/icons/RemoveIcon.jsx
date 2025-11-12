export default function RemoveIcon({className, onClick}) {
    return (
        <svg
          onClick={onClick}
          className={className} 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
        >
          <path
            d="M5.3 18.7C5.5 18.9 5.7 19 6 19s0.5-0.1 0.7-0.3l5.3-5.3 5.3 5.3c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4 12l5.3-5.3c0.4-0.4 0.4-1 0-1.4s-1-0.4-1.4 0L12 10.6 6.7 5.3c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4z"
            fill="#000"
          />
        </svg>
    );
  }
  