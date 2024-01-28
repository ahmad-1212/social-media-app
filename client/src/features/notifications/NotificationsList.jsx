import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import NotificationItem from "./NotificationItem";
import useNotifications from "./useNotifications";

const NotificationsList = () => {
  const {
    data,
    fetchNextPage,
    isFetching: isLoading,
    hasNextPage,
  } = useNotifications();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {!isLoading && !data?.pages.at(0).length && (
        <h4 className="text-xl mt-[10rem] text-center font-[400]">
          No notifications yet!
        </h4>
      )}

      <ul className="w-full flex flex-col gap-4 my-8">
        {data?.pages?.map((page) =>
          page.map((notification, i) => (
            <NotificationItem
              notification={notification}
              key={notification._id}
              ref={page.length - 1 === i ? ref : undefined}
            />
          ))
        )}
      </ul>

      {isLoading && (
        <div className="flex justify-center mt-8">
          <LoadingSpinner className="w-[3rem] h-[3rem] border-[2px]" />
        </div>
      )}
    </>
  );
};

export default NotificationsList;
