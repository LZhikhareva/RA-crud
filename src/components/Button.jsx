import "../index.css";
export default function Button({ onClick, id, classing, text, type }) {
    return (
        <button
            className={classing}
            type={type}
            onClick={() => 
                onClick(id)
            }
        >
            <span>{text}</span>
        </button>
    );
}