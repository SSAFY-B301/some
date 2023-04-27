package com.ssafy.somefriendboy.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album {

    @Id @Column(name = "album_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;

    @Column(name = "album_name")
    private String albumName;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "recent_photo")
    private Long recentPhoto;

    @Column(name = "album_status")
    @Enumerated(EnumType.STRING)
    private AlbumStatus status;

}
