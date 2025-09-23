import { Menu } from "@headlessui/react";
import "../styles/DropDown.css";

export default function Dropdown({
  examplePrompts,
  selected,
  setPromptText,
  setPromptMask,
  imageUrl,
  promptText,
  promptMask,
}) {
  // Determina el valor actual (igual que tu lógica anterior)
  const currentValue = selected === "text" ? promptText : promptMask;

  const handleSelect = (value) => {
    if (selected === "text") setPromptText(value);
    else setPromptMask(value);
  };

  return (
    <div className="custom-dropdown">
      <Menu as="div" className="menu">
        <Menu.Button className="dropdown-btn" disabled={!!imageUrl}>
          {currentValue || "Ejemplos de prompt"} ▼
        </Menu.Button>

        <Menu.Items className="dropdown-menu">
          {examplePrompts.map((prompt) => (
            <Menu.Item key={prompt}>
              {({ active }) => (
                <button
                  onClick={() => handleSelect(prompt)}
                  className={`dropdown-item ${active ? "active" : ""}`}
                >
                  {prompt}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
