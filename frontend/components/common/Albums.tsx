// 라이브러리
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 컴포넌트
import ItemBlock from "components/common/ItemBlock";

// API
import { useGetFavorite, useGetCurrent } from "@/pages/api/albumApi";

// CSS
import styles from "styles/home.module.scss";

// 아이콘
import HeartIcon from "public/icons/Heart.svg";
import DotsIcon from "public/icons/DotsThreeOutline.svg";
import RightIcon from "public/icons/CaretRight.svg";

// 타입
import { CurrentAlbumType, FavoriteAlbumType } from "@/types/AlbumTypes";

/**
 * 최근 업로드된 앨범
 */
function CurrentAlbum() {
  const router = useRouter();

  const { getCurrent, getCurrentIsLoading } = useGetCurrent();

  const currents: React.ReactNode = getCurrent ? (
    getCurrent.map((currentAlbum: CurrentAlbumType) => (
      <div
        onClick={() => router.push(`/album/${currentAlbum.id}`)}
        key={currentAlbum.id}
      >
        <div
          className="bg-center bg-cover"
          style={{
            width: "12.308vw",
            height: "12.308vw",
            backgroundImage: "url(" + currentAlbum.img + ")",
            borderRadius: "3.077vw",
          }}
        >
          <div
            className={`rounded-full flex justify-center items-center relative ${styles.count_circle}`}
            style={{
              width: "5.128vw",
              height: "5.128vw",
              top: "-1.282vw",
              left: "8.974vw",
            }}
          >
            <span className="text-white" style={{ fontSize: "2.564vw" }}>
              {currentAlbum.count <= 10 ? currentAlbum.count : "10+"}
            </span>
          </div>
        </div>
        <p style={{ fontSize: "3.077vw" }}>{currentAlbum.name}</p>
      </div>
    ))
  ) : (
    <p>아직 추가된 사진이 없어요</p>
  );
  return (
    <ItemBlock width="92.308vw" height="28.718vw" radius="16px">
      <div
        className="flex flex-col justify-around w-full h-full"
        style={{ margin: "0px 4.103vw" }}
      >
        <h1 className="font-bold" style={{ fontSize: "5.128vw" }}>
          최근 업로드
        </h1>
        <div className="flex" style={{ gap: "4.103vw" }}>
          {currents}
        </div>
      </div>
    </ItemBlock>
  );
}

/**
 * 즐겨찾는 앨범
 */
function FavoriteAlbum() {
  const router = useRouter();

  const { getFavorite, getFavoriteIsLoading } = useGetFavorite();

  /**
   * 즐겨찾기 토글
   * @param id
   */
  const clickedHeart = (id: number) => {
    // TODO : 즐겨찾기 API 연결
  };

  /**
   * 즐겨찾는 앨범 리스트
   */
  const favorites: React.ReactNode = getFavorite
    ? getFavorite.map((favoriteAlbum: FavoriteAlbumType) => (
        <div
          onClick={() => router.push(`/album/${favoriteAlbum.id}`)}
          key={favoriteAlbum.id}
          className={styles.card}
        >
          <div
            className="bg-center bg-cover "
            style={{
              width: "73.846vw",
              height: "98.462vw",
              borderRadius: "3.077vw",
              backgroundImage: "url(" + favoriteAlbum.img + ")",
            }}
          >
            <div className="flex justify-end relative top-4 right-4 gap-2">
              <HeartIcon
                onClick={() => clickedHeart(favoriteAlbum.id)}
                fill={favoriteAlbum.isLike ? "red" : "none"}
                stroke={favoriteAlbum.isLike ? "red" : "white"}
                width="6.154vw"
                height="6.154vw"
              />
              <DotsIcon
                fill="white"
                stroke="white"
                width="6.154vw"
                height="6.154vw"
              />
            </div>
            <div
              className="flex flex-col relative "
              style={{ width: "32.821vw", top: "6.154vw", left: "4.103vw" }}
            >
              <span
                className="text-white text-end"
                style={{ fontSize: "7.692vw" }}
              >
                {favoriteAlbum.name}
              </span>
              <span
                className="text-white text-end"
                style={{ fontSize: "2.051vw" }}
              >
                {favoriteAlbum.createdTime}
              </span>
            </div>
          </div>
        </div>
      ))
    : [...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`w-72 h-96 rounded-xl grow flex-shrink-0 ${styles.card}`}
          style={{ backgroundColor: "#94a3b8" }}
        >
          <div>
            <span>앨범 생성하러 가기</span>
          </div>
        </div>
      ));
  return (
    <ItemBlock width="92.308vw" height="" radius="5.128vw">
      <div
        className="flex flex-col w-full h-full"
        style={{ gap: "4.103vw", padding: "6.154vw 0px" }}
      >
        <div
          className={`flex justify-between ${styles.title_box}`}
          style={{ margin: "0px 4.103vw" }}
        >
          <h1 className="font-bold" style={{ fontSize: "5.128vw" }}>
            즐겨찾는 앨범
          </h1>
          <RightIcon stroke="#B1B8C0" width="5.128vw" height="5.128vw" />
        </div>
        <div
          className={`flex justify-start overflow-scroll ${styles.cards}`}
          style={{ gap: "4.103vw" }}
        >
          {favorites}
          <div className={`${styles.mask}`}></div>
        </div>
      </div>
    </ItemBlock>
  );
}

export { CurrentAlbum, FavoriteAlbum };
