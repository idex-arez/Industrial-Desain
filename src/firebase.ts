import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  getDocFromServer,
  setDoc,
  deleteDoc,
  onSnapshot,
  increment
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Specify databaseId for provisioned Firestore database
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test Firestore connection on boot as mandated by skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    }
  };
  console.warn('Firestore Error Context: ', JSON.stringify(errInfo));
  return errInfo;
}

export interface ArticleData {
  id: string;
  title: string;
  tabCategory: string;
  date: string;
  category: string;
  readTime: string;
  thumbnail: string;
  lead: string;
  excerpt: string;
  labels: string[];
  bodyHtml: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentData {
  id: string;
  edition: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  createdAt?: string;
}

// 1. Articles Operations
export async function getArticlesFromFirestore(): Promise<ArticleData[]> {
  const colRef = collection(db, 'articles');
  try {
    const snapshot = await getDocs(colRef);
    const articles: ArticleData[] = [];
    snapshot.forEach(docSnap => {
      articles.push(docSnap.data() as ArticleData);
    });
    return articles;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'articles');
    return [];
  }
}

export async function saveArticleToFirestore(article: ArticleData): Promise<boolean> {
  const docRef = doc(db, 'articles', article.id);
  try {
    await setDoc(docRef, article, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `articles/${article.id}`);
    return false;
  }
}

export async function deleteArticleFromFirestore(id: string): Promise<boolean> {
  const docRef = doc(db, 'articles', id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
    return false;
  }
}

// 2. Comments Operations
export async function getCommentsFromFirestore(editionId?: string): Promise<CommentData[]> {
  const colRef = collection(db, 'comments');
  try {
    const snapshot = await getDocs(colRef);
    const comments: CommentData[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as CommentData;
      if (!editionId || data.edition === editionId) {
        comments.push(data);
      }
    });
    return comments;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'comments');
    return [];
  }
}

export async function saveCommentToFirestore(comment: CommentData): Promise<boolean> {
  const docRef = doc(db, 'comments', comment.id);
  try {
    await setDoc(docRef, comment);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `comments/${comment.id}`);
    return false;
  }
}

export async function deleteCommentFromFirestore(commentId: string): Promise<boolean> {
  const docRef = doc(db, 'comments', commentId);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `comments/${commentId}`);
    return false;
  }
}

// 3. Views Operations
export async function getViewsFromFirestore(): Promise<Record<string, number>> {
  const colRef = collection(db, 'views');
  try {
    const snapshot = await getDocs(colRef);
    const viewsMap: Record<string, number> = {};
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as { views?: number };
      viewsMap[docSnap.id] = data.views || 0;
    });
    return viewsMap;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'views');
    return {};
  }
}

export async function incrementViewInFirestore(postId: string): Promise<number> {
  const docRef = doc(db, 'views', postId);
  try {
    const docSnap = await getDoc(docRef);
    let newCount = 1;
    if (docSnap.exists()) {
      newCount = (docSnap.data().views || 0) + 1;
      await setDoc(docRef, { postId, views: increment(1) }, { merge: true });
    } else {
      await setDoc(docRef, { postId, views: 1 });
    }
    return newCount;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `views/${postId}`);
    return 1;
  }
}

// 4. Portfolio Operations
export interface PortfolioData {
  id: string;
  title: string;
  category: '2d' | '3d' | 'produk' | string;
  categoryLabel: string;
  year: string;
  thumbnail: string;
  type: string;
  software: string;
  status: string;
  description: string;
  engineering: string;
  modelKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getPortfoliosFromFirestore(): Promise<PortfolioData[]> {
  const colRef = collection(db, 'portfolios');
  try {
    const snapshot = await getDocs(colRef);
    const list: PortfolioData[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data() as PortfolioData);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'portfolios');
    return [];
  }
}

export async function savePortfolioToFirestore(item: PortfolioData): Promise<boolean> {
  const docRef = doc(db, 'portfolios', item.id);
  try {
    await setDoc(docRef, item, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `portfolios/${item.id}`);
    return false;
  }
}

export async function deletePortfolioFromFirestore(id: string): Promise<boolean> {
  const docRef = doc(db, 'portfolios', id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `portfolios/${id}`);
    return false;
  }
}

