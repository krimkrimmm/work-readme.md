// pendulum.js
// Các tham số
const g = 9.8; // gia tốc trọng trường (m/s^2)
const L = 200; // chiều dài dây con lắc (px)
let alpha = Math.PI / 4; // góc ban đầu (radian)
let omega = 0; // vận tốc góc ban đầu (rad/s)

let dt = 0.02; // bước thời gian (s)
let t = 0; // thời gian (s)
// Lấy đối tượng canvas và context
const canvas = document.getElementById('pendulumCanvas');
const ctx = canvas.getContext('2d');
// Vẽ con lắc
function drawPendulum(alpha) {
    const x = L * Math.sin(alpha);
    const y = L * Math.cos(alpha);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0); // Vị trí gốc
    ctx.lineTo(canvas.width / 2 + x, y); // Đoạn dây
    ctx.stroke();
    // Vẽ quả bóng con lắc
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x, y, 10, 0, 2 * Math.PI); // Vẽ quả bóng
    ctx.fillStyle = "red";
   
    ctx.fill();
}
// Hàm tính toán gia tốc (phi tuyến)
function calculateAcceleration(alpha) {
    return - (g / L) * Math.sin(alpha);
}
// Hàm update chuyển động của con lắc
function updatePendulum() {
    // Tính gia tốc và cập nhật vận tốc, góc
   
    let alphaAcc = calculateAcceleration(alpha);
    omega += alphaAcc * dt;
    alpha += omega * dt;
    // Vẽ lại con lắc
    drawPendulum(alpha);
    // Tiếp tục gọi hàm updatePendulum() sau mỗi bước thời gian
    t += dt;
    requestAnimationFrame(updatePendulum);
}

// Bắt đầu mô phỏng khi trang được tải
window.onload = function() {
    updatePendulum();
};