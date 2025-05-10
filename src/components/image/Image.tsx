export default function Image({
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className="transition-transform duration-300 transform group-hover:scale-110 w-full h-full object-cover"
      {...props}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/not_found.png';
      }}
    />
  );
}
