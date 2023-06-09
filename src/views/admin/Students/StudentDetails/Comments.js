import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { toast } from "react-toastify";

const Comments = () => {
  const [{}, { refetchUniData }] = useKothar();

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success("Data added Successfully");
    },
    onError() {
      toast.error("Error Submitting Data");
    },
  });

  async function postData(payload) {
    await axios.post(`${API_URL}/visaApplications/:id/comments`, payload);
  }
  const submitPost = (e) => {
    e.preventDefault();
    mutate({ hello: "hi" });
  };

  return (
    <div className="my-4 grid grid-cols-12 gap-4">
      <div className="col-span-3 sub-heading mt-0">Comments</div>
      <div className="col-span-9">
        <div class="w-full mx-auto">
          <div class="flex justify-between items-center mb-6">
            <div className="view-label">Discussion (20)</div>
          </div>
          <form class="mb-6 flex flex-col " onSubmit={submitPost}>
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                class="px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none w-full"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <Button variant="contained" type="submit" className="ml-auto">
              Post comment
            </Button>
          </form>
          <article class="p-6 mb-6 text-base bg-white rounded-lg border-b">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 ">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  Michael Gough
                </p>
                <p class="text-sm text-gray-600 ">
                  <time
                    pubdate
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    Feb. 8, 2022
                  </time>
                </p>
              </div>
            </footer>
            <p class="text-gray-500 ">
              Very straight-to-point article. Really worth time reading. Thank
              you! But tools are just the instruments for the UX designers. The
              knowledge of the design tools are as important as the creation of
              the design strategy.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Comments;
