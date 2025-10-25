import React from "react";
import Stars from "./Stars";
const ReviewCard = ({ review,general }) => {
  const trimReview=(review)=>{
    return review.substring(0,130)+'...';
  }
trimReview('Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere provident fugiat consequatur omnis magnam dolores possimus aperiam error? Aut assumenda ullam veritatis exercitationem non molestiae laudantium nulla, vitae quibusdam consequuntur ducimus alias nostrum distinctio vero incidunt! Mollitia ducimus, hic, quas eligendi deleniti ipsa laudantium sit iste soluta commodi adipisci nulla repellendus ullam nemo tempore obcaecati, voluptatem quasi ipsum atque. Iusto, laboriosam excepturi rem libero eveniet, esse delectus modi voluptatum repellendus dignissimos molestias laudantium maxime sapiente eligendi maiores soluta qui. Dolorum vitae expedita incidunt dolore harum quibusdam, aut, maiores quidem inventore odit repellendus recusandae cum vel commodi tenetur sapiente ea eveniet ipsum esse in facere perspiciatis a? Harum modi eos odit, nobis dolorem commodi vel assumenda! Quam nemo laborum aliquid deserunt fugit, labore voluptatem fugiat animi id, mollitia optio consequatur tempore commodi quasi accusantium a aliquam praesentium? Porro quod amet voluptatibus veritatis voluptas sint sunt qui, soluta quibusdam consectetur obcaecati ratione, magni natus non ut? Nesciunt iusto quam est tempora beatae, accusamus at maiores deleniti excepturi ipsam blanditiis hic expedita similique ipsa saepe numquam? Qui accusamus tenetur sit quos consequuntur natus quidem esse dolores aspernatur accusantium tempore repellat, itaque illo dignissimos, impedit molestiae ad. Veniam, nihil eligendi unde cupiditate iure explicabo ut ab tempora soluta hic ad doloribus ipsam tenetur minima corporis voluptatibus modi, expedita quaerat repellat doloremque. Dolorum earum doloribus quisquam dicta deleniti ab similique. Itaque libero, nesciunt culpa pariatur ea sunt iure corrupti sed. Odit laboriosam ipsum laudantium nobis eaque eum dignissimos incidunt? Autem dolorem et velit. Qui at doloremque quaerat animi quos blanditiis iure facere voluptates cum amet. Perferendis deserunt, omnis labore saepe placeat ullam atque voluptatem officiis repellendus repudiandae itaque, consequuntur laboriosam in? Architecto, ullam. Possimus nobis, incidunt minima veritatis, quaerat voluptates dolorum cum perspiciatis odit facilis impedit quo quibusdam maiores perferendis error adipisci aliquid doloribus. Provident quas reiciendis exercitationem error molestias, in nostrum perspiciatis, quisquam accusamus explicabo laboriosam eligendi aut eaque. Laboriosam optio unde obcaecati ut facere iste amet at aliquid ipsa earum illum praesentium consequatur nihil quas vitae, adipisci sed, expedita velit porro? Repellendus labore temporibus quod alias repellat unde rem ipsam vero sapiente. Nihil atque ex saepe numquam temporibus eos laudantium ratione consectetur tempora quis facere, ea doloremque eaque inventore. Repellat quis laboriosam unde nulla quidem iure, quod blanditiis saepe, architecto cumque nihil, reiciendis beatae provident impedit aut praesentium veniam tempora cupiditate? Nihil laboriosam aliquam est accusantium et debitis dignissimos! Est magni saepe perspiciatis!');
  return (
    <div className={`${general ? "min-h-[18em]": "min-h-[14em]"} flex  items-center justify-between md:items-start bg-richblack-800 p-7 flex-col gap-2`}>
      <div className="flex gap-3">
        <img className="w-10 h-10 rounded-full" src={review?.user?.image} alt="profile pic" />
        <div className="text-richblack-5">
            <p className="text-richblack-5 font-semibold">{review?.user?.firstName} {review?.user?.lastName}</p>
            <p className="text-richblack-600 text-[12px] font-medium">{review?.user?.email}</p>
        </div>
      </div>
      {
        general && <p className="text-richblack-25 text-sm">Enrolled in <span className="font-semibold">{review?.course?.name}</span></p>
      }
      <p className="text-richblack-25 text-center sm:text-start text-sm">{trimReview(review?.review)}</p>
      <div className="text-richblack-5 flex gap-1 items-center"><span className="text-yellow-50 font-semibold ">{review?.rating}</span><Stars rating={review?.rating}/></div>
    </div>
  );
};

export default ReviewCard;
