import { ColoredKomik, NewUpdate } from "../../constant/mangaType";

import { Link } from "react-router-dom";

const CardManga = (props: ColoredKomik) => {
  return (
    <div className=" snap-start border inline-block rounded-md shadow-md w-40 min-h-fit overflow-hidden">
      <Link to={`/${props.link.endpoint}`}>
        <img
          className="h-36 min-w-[160px] object-fill "
          src={props.thumb}
          alt="thumb image"
        />
        <h1 className="font-bold text-sm m-1 text-ellipsis line-clamp-2">
          {props.name}
        </h1>
        <div className="bg-secondary rounded-lg mx-1">
          <p>{props.last_chapter?.name}</p>
          <p>{props.last_upload}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardManga;
