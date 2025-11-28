import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const MyLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="262" rx="11" ry="11" width="280" height="27" />
    <rect x="0" y="315" rx="12" ry="12" width="280" height="82" />
    <rect x="2" y="422" rx="8" ry="8" width="95" height="30" />
    <rect x="125" y="413" rx="22" ry="22" width="156" height="45" />
    <circle cx="138" cy="120" r="120" />
  </ContentLoader>
);

export default MyLoader;
