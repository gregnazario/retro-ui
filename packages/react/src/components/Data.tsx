import { useState, type ReactNode } from "react";

export function Tabs({
  tabs,
  defaultTab,
}: {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultTab?: string;
}) {
  const first = tabs[0]?.id;
  const [active, setActive] = useState(defaultTab ?? first);

  return (
    <div className="retro-tabs">
      <div className="retro-tablist" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className="retro-tab"
            aria-selected={tab.id === active}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) =>
        tab.id === active ? (
          <div key={tab.id} role="tabpanel" className="retro-tabpanel">
            {tab.content}
          </div>
        ) : null,
      )}
    </div>
  );
}

export function ListBox({
  items,
  value,
  onChange,
}: {
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <ul className="retro-listbox" role="listbox">
      {items.map((item) => (
        <li
          key={item}
          role="option"
          aria-selected={item === value}
          data-selected={item === value}
          onClick={() => onChange?.(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="retro-table-wrap">
      <table className="retro-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} data-selected={index === 0}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
