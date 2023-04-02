import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/FilmDetails.css";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Navbar from "./Navbar.js";
const FilmDetail = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = window.localStorage.getItem("data");
  const users = window.localStorage.getItem("users");
  const iduser = window.localStorage.getItem("id");
  const score = useRef(0);
  const comment = useRef();
  const [categorys, setCategorys] = useState(JSON.parse(data));
  const [listuser, setListuser] = useState(JSON.parse(users));
  const [reaload, setReload] = useState();
  const cate = categorys.find((category) => {
    return category.film.find((fi) => fi.id == id) != undefined;
  });
  const film = cate.film.find((fi) => fi.id == id);
  const [cmuser, setCmuser] = useState(
    film.comment != undefined &&
      film.comment.find((cm) => cm.userid == iduser) != undefined
  );

  const listOfCm = film.comment;
  const GetScore = (film) => {
    var sc = 0;
    var total = 0;
    film.comment != undefined &&
      film.comment != null &&
      film.comment.forEach((f) => {
        if (f.score != null) {
          sc += f.score;
          total += 1;
        }
      });
    if (total != 0) sc = (sc / total).toFixed(1);
    return sc;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let sc = score.current.value;
    let cm = comment.current.value;
    if (sc < 0 || sc > 10) {
      swal(
        "Lỗi rồi :))",
        "Điểm đánh giá nằm trong đoạn [0,10]. Mời nhập lại !!",
        "error"
      );
    } else if (cm == "") {
      swal("Lỗi rồi :))", "Nhận xét trống kìa :33", "error");
    } else {
      var id = 0;
      let check = false;
      categorys.forEach((cate) => {
        cate.film.forEach((fi) => {
          id += fi.comment.length;
        });
      });
      if (
        film.comment != undefined &&
        film.comment.find((cm) => cm.userid == iduser) == undefined
      ) {
        const newComment = {
          id: id++,
          userid: iduser,
          score: check ? null : sc,
          comment: cm,
        };
        film.comment.unshift(newComment);
        window.localStorage.setItem("data", JSON.stringify(categorys));
      } else if (
        film.comment != undefined &&
        film.comment.find((cm) => cm.userid == iduser) != undefined
      ) {
        const cmu = film.comment.find((cm) => cm.userid == iduser);
        const index = film.comment.indexOf(cmu);
        cmu.score = sc;
        cmu.comment = cm;
        film.comment.splice(index, 1, cmu);
        window.localStorage.setItem("data", JSON.stringify(categorys));
      }
      // cate.film.comment = [...film];
      console.log(categorys);
      swal("Đánh giá thành công !!", "", "success").then(() => setCmuser(true));
    }
  };
  return (
    cate != null && (
      <>
        <Navbar />
        <div className="content">
          <div className="fimdetail">
            <div className="img">
              <img src={film.img} alt={film.name}></img>
            </div>
            <div className="moreInfor">
              <h1 style={{ marginBottom: "20px" }}>{film.name}</h1>
              <div style={{ maxHeight: "40vh", overflow: "auto" }}>
                <h6 style={{ marginBottom: "3px" }}>
                  Thể loại: <span className="fwnomal">{cate.title}</span>
                </h6>
                <h6 style={{ marginBottom: "3px" }}>
                  Điểm đánh giá:{" "}
                  <span className="fwnomal">{GetScore(film)}</span>
                </h6>
                <h6 style={{ marginBottom: "3px" }}>
                  Mô tả: <span className="fwnomal">{film.description}</span>
                </h6>
              </div>
              <div className="rateAndScore">
                {iduser == null ? (
                  <Button
                    onClick={() => {
                      swal(
                        "Bạn chưa đăng nhập ...",
                        "Đăng nhập ngay !!!",
                        "error"
                      ).then(() => navigate("../login"));
                    }}
                    className="btnbut"
                  >
                    Đánh giá
                  </Button>
                ) : (
                  <>
                    {!cmuser && (
                      <form
                        className="hide"
                        onSubmit={(e) => {
                          handleOnSubmit(e);
                        }}
                      >
                        <h5>Chi tiết đánh giá</h5>
                        <p>Điểm đánh giá:</p>
                        <input
                          type="number"
                          ref={score}
                          style={{ padding: "0px 5px" }}
                          defaultValue={
                            film.comment != undefined &&
                            film.comment != null &&
                            film.comment.find((cm) => cm.userid == iduser) !=
                              undefined
                              ? film.comment.find((cm) => cm.userid == iduser)
                                  .score
                              : null
                          }
                        />
                        <p>Bình Luận</p>
                        <textarea
                          type="text"
                          rows={2}
                          ref={comment}
                          placeholder="Viết bình luận ..."
                          defaultValue={
                            film.comment != undefined &&
                            film.comment != null &&
                            film.comment.find((cm) => cm.userid == iduser) !=
                              undefined
                              ? film.comment.find((cm) => cm.userid == iduser)
                                  .comment
                              : null
                          }
                        ></textarea>
                        <Button type="submit" className="btnbut">
                          Đánh giá
                        </Button>
                      </form>
                    )}

                    {cmuser && (
                      <Button
                        type="button"
                        className="btnbut"
                        onClick={() => setCmuser(false)}
                      >
                        Chỉnh sửa đánh giá
                      </Button>
                    )}
                  </>
                )}

                <div className="comment">
                  <h4>Bình Luận:</h4>
                  {listOfCm == null || listOfCm.length == 0 ? (
                    <h6>No comment</h6>
                  ) : (
                    listOfCm.map((comment) => {
                      return (
                        <div key={comment.id}>
                          <h6>
                            {listuser != null &&
                              listuser.find((u) => {
                                return u.id == comment.userid;
                              }).fullname}
                            {listuser != null &&
                            listuser.find((u) => {
                              return u.id == comment.userid && u.id == iduser;
                            }) != undefined
                              ? " (You) "
                              : ""}
                            :
                            <span className="comment_detail">
                              {comment.comment}
                            </span>
                          </h6>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default FilmDetail;
