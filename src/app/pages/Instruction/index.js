import React from "react";
import { InstructionWrapper } from "./InstructionStyle";
import { CardQuiz } from 'app/components/CardQuiz';
import { CaretRightOutlined } from '@ant-design/icons';

function Instruction() {
    return (
        <InstructionWrapper>
            <div>
                <h2 style={{ fontWeight: '900', color: 'blue' }}>
                    Hướng dẫn thi tr&ecirc;n nền tảng WiiQuiz
                </h2>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>Ch&agrave;o mừng c&aacute;c bạn đến với nền tảng thi trực tuyến WiiQuiz.</p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau khi đăng k&yacute; v&agrave; đăng nhập, bạn sẽ v&agrave;o được trang
                    ch&iacute;nh.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(13).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    T&agrave;i khoản đăng nhập l&agrave; đại diện cho phụ huynh. Đầu ti&ecirc;n,
                    qu&yacute; phụ huynh tạo học sinh mới bằng c&aacute;ch nhấn v&agrave;o
                    n&uacute;t &quot;Th&ecirc;m học sinh&quot; tr&ecirc;n thanh menu b&ecirc;n
                    tr&aacute;i.
                 </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(14).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Qu&yacute; phụ huynh nhập đầy đủ th&ocirc;ng tin của học sinh, sau đ&oacute;
                    bấm n&uacute;t &quot;Th&ecirc;m học sinh&quot; ph&iacute; b&ecirc;n dưới để
                    th&ecirc;m học sinh. C&aacute;c trường th&ocirc;ng tin n&agrave;o c&oacute;
                    dấu sao * m&agrave;u đỏ l&agrave; những trường th&ocirc;ng tin cơ bản,
                    gi&uacute;p ch&uacute;ng t&ocirc;i phục vụ tốt hơn, mong qu&yacute; phụ huynh
                    kh&ocirc;ng để trống. Sau khi th&ecirc;m học sinh th&agrave;nh c&ocirc;ng,
                    qu&yacute; phụ huynh c&oacute; thể xem lại th&ocirc;ng tin học sinh tại menu
                    &quot;Danh s&aacute;ch học sinh&quot;
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(15).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Qu&yacute; phụ huynh c&oacute; thể bấm v&agrave;o t&ecirc;n của học sinh để
                    thay đổi th&ocirc;ng tin hoặc x&oacute;a.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(17).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Để đăng k&yacute; thi, Qu&yacute; phụ huynh chọn menu &quot;Đăng k&yacute;
                    thi&quot;.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(16).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Qu&yacute; phụ huynh bấm v&agrave;o b&agrave;i th&igrave; mong muốn để xem
                    th&ocirc;ng tin chi tiết của b&agrave;i thi.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(19).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Bấm n&uacute;t &quot;Đăng k&yacute; ngay&quot; để đăng k&yacute; thi. Sau
                    đ&oacute; chọn học sinh muốn thi.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(20).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau khi đăng k&yacute; th&agrave;nh c&ocirc;ng, Qu&yacute; phụ huynh chọn menu
                    &quot;Danh s&aacute;ch học sinh&quot;
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(26).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>

                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau đ&oacute; bấm n&uacute;t b&agrave;i thi của học sinh muốn thi. Tại
                    đ&acirc;y, m&igrave;nh sẽ c&oacute; 4 mục, đ&atilde; đăng k&yacute;, đang thi,
                    đ&atilde; nộp, v&agrave; đ&atilde; chấm.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(21).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Tại mục Đ&atilde; đăng k&yacute;, chọn b&agrave;i thi muốn thi, v&agrave; sau
                    đ&oacute; v&agrave;o thi.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(22).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(28).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau khi cho học sinh thi xong, bấm n&uacute;t nộp b&agrave;i để nộp.
                    B&agrave;i thi sẽ tự động nộp nếu hết thời gian.
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau khi nộp, b&igrave;nh thường b&agrave;i thi sẽ ở trạng th&aacute;i chưa
                    chấm như b&ecirc;n dưới.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(23).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Hệ thống sẽ tự động chấm sau v&agrave;i gi&acirc;y, c&oacute; thể tải lại
                    trang để xem kết quả thi
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(25).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    C&oacute; thể xem lại c&aacute;c b&agrave;i đ&atilde; thi, đ&atilde; chấm bằng
                    c&aacute;ch bấm v&agrave;o n&uacute;t &quot;B&agrave;i thi&quot; của học sinh
                    cần xem.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(26).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Khi đang thi, nếu học sinh v&ocirc; t&igrave;nh tắt trang web, bị m&aacute;t
                    kết nối, mất điện,... Qu&yacute; phụ huynh kh&ocirc;ng cần lo lắng. Sau khi
                    kết nối lại được, Qu&yacute; phụ huynh chọn mục đang thi trong danh
                    s&aacute;ch c&aacute;c b&agrave;i thi của học sinh v&agrave; bấm v&agrave;o
                    n&uacute;t &quot;Tiếp tục&quot; để tiếp tục l&agrave;m b&agrave;i.
                </p>
                <p>
                    <img
                        src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/HTML/huong_dan_su_dung/Screenshot+(27).png"
                        style={{ width: '100%' }}
                        class="fr-fic fr-dib"
                    />
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>
                    Sau đ&oacute; th&igrave; cứ tiếp tục l&agrave;m b&agrave;i thi. Ch&uacute;
                    &yacute; thời gian vẫn được t&iacute;nh trong l&uacute;c mất kết nối,
                    n&ecirc;n t&igrave;m c&aacute;ch kết nối lại nhanh nhất c&oacute; thể
  nh&eacute;.
                </p>
                <p><CaretRightOutlined style={{paddingRight: '10px'}}/>Ch&uacute;c c&aacute;c học sinh học h&agrave;nh thật vui vẻ nh&eacute;.</p>



            </div>
        </InstructionWrapper>

    );
}

export default Instruction;
