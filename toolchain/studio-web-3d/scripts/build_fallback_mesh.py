"""Generate a genuine glTF/GLB *structure preview* using trimesh, no Blender or GPU.
This is not a substitute for Blender PBR shading or a visually audited renderer.
"""
import math, os, argparse
import numpy as np
import trimesh

parser=argparse.ArgumentParser()
parser.add_argument('--out',default='web/public/assets/webpage-sculpture.glb')
args=parser.parse_args()
os.makedirs(os.path.dirname(args.out),exist_ok=True)
scene=trimesh.Scene()

def band(name,layer,color,width,amplitude,shift):
    verts=[];faces=[];n=88
    for i in range(n+1):
        t=i/n;theta=math.pi*(.10+1.45*t)
        px=2.6*math.cos(theta)-.23
        py=.6*math.sin(theta*2)+layer*.34
        pz=2.1*math.sin(theta)+.20+shift
        nx=-.32*math.sin(theta);ny=width*math.cos(theta*.55);nz=.17*math.cos(theta)
        fold=amplitude*math.sin(t*math.pi*2.4)
        for s in [-1,1]:
            verts.append([px+s*nx,py+s*ny,pz+fold+s*nz])
    for i in range(n):
        a=2*i;faces.extend([[a,a+1,a+3],[a,a+3,a+2]])
    mesh=trimesh.Trimesh(vertices=np.array(verts),faces=np.array(faces),process=True)
    mesh.visual.vertex_colors=np.tile(np.array(color,dtype=np.uint8),(len(mesh.vertices),1))
    scene.add_geometry(mesh,geom_name=name,node_name=name)

def box(name,loc,scale,color):
    mesh=trimesh.creation.box(extents=scale)
    mesh.apply_translation(loc)
    mesh.visual.vertex_colors=np.tile(np.array(color,dtype=np.uint8),(len(mesh.vertices),1))
    scene.add_geometry(mesh,geom_name=name,node_name=name)

band('STRUCTURE__metal_page',-.85,[150,178,190,255],.46,.09,-.26)
band('CONTENT__ivory_page',.02,[237,224,207,255],.57,-.045,.04)
band('INTERACTION__copper_ribbon',.91,[228,111,69,255],.21,.04,.22)
box('WEBSITE_UI__navigation_shell',(-1.26,-1.05,.88),(1.42,.12,.18),[25,35,42,255])
for i in range(3):
    box('WEBSITE_UI__section_'+str(i+1),(-1.79+i*.42,-1.18,.88),(.26,.07,.055),[233,138,93,255] if i==0 else [235,227,207,255])
box('WEBSITE_UI__hero',(1.4,.66,1.55),(.55,.10,.73),[27,36,43,255])
box('WEBSITE_UI__content',(1.36,.51,1.49),(.27,.05,.47),[237,224,207,255])
box('WEBSITE_UI__cta',(1.45,.40,1.20),(.25,.065,.09),[229,118,68,255])
with open(args.out,'wb') as f:f.write(scene.export(file_type='glb'))
print('Generated a real glTF model with',len(scene.geometry),'meshes:',args.out)
