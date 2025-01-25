import "../index.css";
import Button from "./Button";

export default function Notes({ notes, onClick }) {
    if (notes.length === 0) {
        return null;
    }
    return (
        <div className="notes">
            {[...notes].map((note, index) => (
                <div key={index} className="note">
                    <div className="text">{note.content}{" "}</div>
                    <Button classing='close' type='button' onClick={(id) => onClick(id)} id={note.id} text='&#10006;'/>
                </div>
            ))}
        </div>
    );
}