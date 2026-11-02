type Props = {
  label: string
  options: { option: string; tradeoff: string; disposition: string }[]
}

/** Existing data-table primitive; claims come from the adjacent narrative. */
export function DecisionTable({ label, options }: Props) {
  return (
    <div className="decision-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table className="decision-table">
        <caption className="t-mono-label">{label}</caption>
        <thead><tr>{["DIRECTION", "TRADEOFF", "DECISION"].map((title) => <th key={title} scope="col" className="t-mono-label">{title}</th>)}</tr></thead>
        <tbody>{options.map((row) => (
          <tr key={row.option}>
            <th scope="row" className="t-body-sm">{row.option}</th>
            <td className="t-body-sm">{row.tradeoff}</td>
            <td className="t-body-sm">{row.disposition}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}
