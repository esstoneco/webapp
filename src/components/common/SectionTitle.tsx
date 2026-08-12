type Props = {
    title: string;
    subtitle?: string;
};

export default function SectionTitle({
    title,
    subtitle,
}: Props) {
    return (

        <div className="mb-16 text-center">

            {subtitle && (

                <p className="mb-3 uppercase tracking-[6px] text-stone-500">

                    {subtitle}

                </p>

            )}

            <h2 className="text-5xl font-bold">

                {title}

            </h2>

        </div>

    );
}