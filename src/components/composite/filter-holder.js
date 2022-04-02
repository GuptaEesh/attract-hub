export function FilterHolder({ children, legendName }) {
    return (
        <fieldset>
            <legend className="bold">{legendName}</legend>
            <div style={{ padding: '10px' }}>{children}</div>
        </fieldset>
    )
}
