import React from "react";

export default function HostIcon(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={"icon"} {...props}>
            <svg
                className={"neon"}
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="0 0 128 128"
                enableBackground="new 0 0 128 128"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m66 11h4v11h12v-11h8.992s3.998-0.929 3.998 1.837c0 4.097 0.095 23.839 0.095 23.839s-3.046 9.324-9.233 9.324h-44.404c-6.187 0-8.4-9.904-8.4-9.904s0.095-18.397 0.095-22.495c0-2.945 3.998-2.601 3.998-2.601h4.859v11h11v-11h13m-1.278 87h-32.722v-9.082c9-9.614 10-25.985 10-25.985v-13.933h39v13.933s1 16.372 10 25.985v9.082h-26.278zm-2.722-38.351l-6 6.52v15.831h12v-15.831l-6-6.52zm-39 43.261v11.208c0 4.64 6.314 6.882 6.314 6.882s66.533 0 70.531 0 2.156-6.668 2.156-6.668 0-6.282 0-11.065c0-3.642-3.012-1.267-3.012-1.267h-69.674c-1e-3 0-6.315-2.167-6.315 0.91z" />
            </svg>
        </div>
    );
}
