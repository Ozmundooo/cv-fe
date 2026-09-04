export default function ImpactGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(({ title, value, description, className, suffix }) => (
        <article
          key={title}
          className={`flex min-h-[334px] flex-col rounded p-5 ${className}`}
        >
          <h3 className="font-impact-title max-w-[340px]">{title}</h3>
          <p className="font-impact-value mt-auto">
            {value}

            {suffix && (
              <span className="font-normal text-lg tracking-tight">
                {" "}
                {suffix}
              </span>
            )}
          </p>
          <p className="font-impact-description  max-w-[400px]">
            {description}
          </p>
        </article>
      ))}
    </div>
  );
}
