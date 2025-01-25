import Button from "./Button";

export default function AddNote({ onSubmit, handleChange, value }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="add-note">
                <h1>Добавить новую заметку:</h1>
                <textarea className="input"
                    placeholder="Введите текст заметки"
                    onChange={handleChange}
                    value={value}
                ></textarea>
            </div>
            <Button classing="ok" type="submit" text='Добавить заметку'/>
        </form>
    );
}