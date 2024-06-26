import { StarIcon } from "@heroicons/react/20/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Stars({ rating }) {
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon
          key={i}
          className={classNames(
            rating > i ? "text-[#fc8507]" : "text-[#fc8507]/50",
            "h-7 w-7 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
