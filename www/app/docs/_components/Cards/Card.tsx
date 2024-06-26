import Link from "next/link";
import Image from "next/image";
import { NavigationRoots } from "../SideNavigation";
import { FileMetadata } from "../../_utils/findDocFile";

type Props = {
  file: string;
  root: NavigationRoots;
  icon?: "sql";
};
export default async function Card(props: Props) {
  const { file, root, icon } = props;
  let metadata: null | FileMetadata = null;
  try {
    const imported = await import(
      `../../${root}/\[\[...slug\]\]${file.slice(1, file.length)}`
    );
    metadata = imported.metadata;
  } catch (e) {
    console.error(e);
  }
  if (metadata == null) {
    return null;
  }
  const href = file
    .split("/")
    .map((part) => {
      let maybePart = part;
      if (/\.mdx$/.test(maybePart)) {
        maybePart = maybePart.replace(/\.mdx/, "");
      }
      return maybePart;
    })
    .join("/");
  return (
    <Link href={`/docs/${root}/${href}`} style={{ textDecoration: "none" }}>
      <div className="border-2 w-64 px-4 py-1 border-gray hover:border-lightGray transition-colors rounded-xl flex flex-row items-center gap-4 hover:bg-divider-glow">
        {icon && (
          <div className="h-[40px] w-[40px] flex items-center">
            <Image
              width={40}
              height={40}
              src={`/icons/${icon}`}
              alt={icon}
              className="m-0"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h4 className="text-lg">{metadata.title}</h4>
          <p className="text-sm font-light">{metadata.description}</p>
        </div>
      </div>
    </Link>
  );
}
