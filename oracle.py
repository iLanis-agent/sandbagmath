import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def course(h, c):
    n = (h + c - 1)//c
    return f"A wall {h} inches tall in courses of {c} inches takes {pl(n,' course',' courses')}."
def bags(l, n, b):
    per = (l*12 + b - 1)//b
    return f"The {l} ft run in bags {b} inches long takes {pl(per,' bag',' bags')} a course, {pl(per*n,' bag',' bags')} over {pl(n,' course',' courses')}."
def weight(n, w):
    t = n*w
    return f"The {pl(n,' bag',' bags')} at {w} lb hold {t} lb, or {dec(hu(t*100,2000))} tons."
def cost(n, p, f, l):
    c = n*p + f
    return f"The {pl(n,' bag',' bags')} at ${dec(p)} and ${dec(f)} delivery cost ${money(c)}, or ${money(hu(c,l))} a foot over the {l}."
random.seed(755)
R=random.randint
cases = [
 dict(fn="course", args=["16","4"], expect=course(16,4)),
 dict(fn="bags", args=["20","4","18"], expect=bags(20,4,18)),
 dict(fn="weight", args=["56","40"], expect=weight(56,40)),
 dict(fn="cost", args=["56","1.25","25","20"], expect=cost(56,125,2500,20)),
]
for _ in range(25):
    h,c=R(1,240),R(1,24); cases.append(dict(fn="course", args=[str(h),str(c)], expect=course(h,c)))
for _ in range(25):
    l,n,b=R(1,10000),R(1,100),R(1,120); cases.append(dict(fn="bags", args=[str(l),str(n),str(b)], expect=bags(l,n,b)))
for _ in range(20):
    n,w=R(1,100000000),R(1,200); cases.append(dict(fn="weight", args=[str(n),str(w)], expect=weight(n,w)))
for _ in range(20):
    n,p,f,l=R(1,100000000),R(1,1000000),R(1,1000000),R(1,10000)
    cases.append(dict(fn="cost", args=[str(n),dec(p),dec(f),str(l)], expect=cost(n,p,f,l)))
errs=[["course",["0","4"]],["course",["16","0"]],["course",["16","25"]],["bags",["0","4","18"]],["bags",["20","0","18"]],["bags",["20","4","0"]],
 ["weight",["0","40"]],["weight",["56","0"]],["weight",["56","201"]],["cost",["0","1.25","25","20"]],["cost",["56","0","25","20"]],["cost",["56","1.25","0","20"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
