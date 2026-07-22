function Card({ title, value, subtitle, color }) {

    return (

        <div
            className={`rounded-2xl p-6 shadow-lg text-white transition-transform duration-300 hover:scale-105 ${color}`}
        >

            <p className="text-sm opacity-80">
                {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
                {value}
            </h2>

            {subtitle && (
                <p className="mt-3 text-sm opacity-80">
                    {subtitle}
                </p>
            )}

        </div>

    );

}export default Card;