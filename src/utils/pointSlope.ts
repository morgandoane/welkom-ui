export interface Point {
  x: number;
  y: number;
}

export interface PointSlope {
  m: number;
  x: number;
  y: number;
  b: number;
}

export const pointSlope = (p1: Point, p2: Point, x: number): PointSlope => {
  const m = Math.round((p2.y - p1.y) / (p2.x - p1.x));
  const b = Math.round(p1.y - m * p1.x);
  const y = Math.round(m * x + b);
  return { y, m, x, b };
};
