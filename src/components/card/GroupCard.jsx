import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts";

const GroupCard = (group) => {
  const { adminId, name, members, id } = group;
  const {
    authState: { uid },
  } = useAuth();

  const navigate = useNavigate();

  return (
    <article className="flex flex-col justify-between min-h-[12rem] w-[18rem] bg-white border-2 border-gray-100 shadow-md p-3 rounded">
      <div>
        <h3 className="text-lg font-bold line-clamp-2 text-clip">{name}</h3>
        <h6 className="text-md text-gray-400 font-semibold">
          Members : {members.length}
        </h6>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="bg-gray-300 font-bold p-1 px-3 rounded-[2rem]">
          {uid === adminId ? "Admin" : "Member"}
        </span>
        <Link to={`groups/${id}`}>
          <button className="self-end bg-blue-600 text-white font-bold p-1 px-3 rounded-[2rem] w-fit">
            Open
          </button>
        </Link>
      </div>
    </article>
  );
};

export { GroupCard };
