import { Fragment, type ReactNode } from "react";
import { A, KeyCallout, OptionCards, FactGrid, CheckList, InfoCallout, WarningCallout, ActionLink } from "@/components/seo/modules";
import type { MoneyBlock } from "@/data/seo/content/types";

/**
 * Parser inline mínimo y seguro: convierte **negrita** y [texto](/ruta) en
 * nodos React (enlaces internos con el componente A). No interpreta HTML.
 */
const renderInline = (text: string): ReactNode => {
  const nodes: ReactNode[] = [];
  // Patrón combinado: enlaces [..](..) o negritas **..**
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] && m[2]) {
      const to = m[2];
      nodes.push(
        to.startsWith("/") ? (
          <A key={key++} to={to}>
            {m[1]}
          </A>
        ) : (
          <a key={key++} href={to} className="font-medium text-accent-deep underline-offset-4 hover:underline" rel="nofollow">
            {m[1]}
          </a>
        ),
      );
    } else if (m[3]) {
      nodes.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return nodes;
};

/** Tabla comparativa simple para usar dentro de una sección. */
const SimpleTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-3xl border border-border bg-surface-elevated shadow-soft">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-border">
          {headers.map((h) => (
            <th key={h} className="p-4 font-poppins font-semibold text-foreground">
              {renderInline(h)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border/60 last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="p-4 align-top leading-relaxed text-foreground/85">
                {renderInline(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Block = ({ block }: { block: MoneyBlock }) => {
  switch (block.kind) {
    case "paragraph":
      return <p className="text-base leading-relaxed text-foreground/85">{renderInline(block.text)}</p>;
    case "keyCallout":
      return (
        <KeyCallout eyebrow={block.eyebrow} headline={renderInline(block.headline)} tone={block.tone}>
          {block.body && <p>{renderInline(block.body)}</p>}
        </KeyCallout>
      );
    case "optionCards":
      return (
        <OptionCards
          columns={block.columns}
          items={block.items.map((it) => ({
            icon: it.icon,
            title: it.title,
            text: renderInline(it.text),
            links: it.links && it.links.length > 0 ? (
              <>
                {it.links.map((l) => (
                  <A key={l.to} to={l.to}>
                    {l.label}
                  </A>
                ))}
              </>
            ) : undefined,
          }))}
        />
      );
    case "factGrid":
      return (
        <FactGrid
          columns={block.columns}
          items={block.items.map((f) => ({ value: f.value, label: f.label, detail: f.detail ? renderInline(f.detail) : undefined }))}
        />
      );
    case "checkList":
      return <CheckList variant={block.variant} items={block.items.map((i) => renderInline(i))} />;
    case "callout":
      return block.variant === "warning" ? (
        <WarningCallout title={block.title}>
          <p>{renderInline(block.text)}</p>
        </WarningCallout>
      ) : (
        <InfoCallout title={block.title}>
          <p>{renderInline(block.text)}</p>
        </InfoCallout>
      );
    case "table":
      return <SimpleTable headers={block.headers} rows={block.rows} />;
    case "actionLink":
      return <ActionLink to={block.to}>{renderInline(block.text)}</ActionLink>;
    default:
      return null;
  }
};

/** Renderiza una lista de bloques tipados como el cuerpo de una sección. */
const SectionBlocks = ({ blocks }: { blocks: MoneyBlock[] }) => (
  <div className="space-y-5">
    {blocks.map((b, i) => (
      <Block key={i} block={b} />
    ))}
  </div>
);

export default SectionBlocks;